const {AuthenticationError} = require('apollo-server-errors');
const User = require('../models/User');
const passport = require('../utils/pass');
const jwt = require('jsonwebtoken');

module.exports = {
    Query: {
        user: async (parent, args, {user}) => {
            try {
                console.log('userResolver', user);
                // find user by id
                return await User.findById(user._id);
            } catch (err) {
                throw err;
            }
        },
        login: async (parent, args, {req, res}) => {
            // call passport login (done in class)
            try {
                return await new Promise((resolve, reject) => {
                    passport.authenticate(
                        'local',
                        {session: false},
                        (err, user, info) => {
                            if (err || !user) {
                                reject("Login failed")
                                // throw new AuthenticationError('login failed');
                            }
                            req.login(user, {session: false}, (err) => {
                                if (err) {
                                    throw err;
                                }
                                // generate a signed son web token with the contents of user object and return it in the response
                                const token = jwt.sign(user, 'your_jwt_secret');
                                resolve({
                                    ...user,
                                    token,
                                });
                            });
                        }
                    )({body: args}, res);
                });
            } catch (err) {
                throw(err)
            }
        },
    },
    Mutation: {
        registerUser: async (parent, args) => {
            try {
                return User.create(args);
            } catch (err) {
                if (err.name === 'MongoError' && err.code === 11000) {
                    throw new Error('User already exist!');
                }

                // Some other error
                throw new Error(err);
            }
        },
    },
};
