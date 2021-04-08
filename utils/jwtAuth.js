'use strict';
const jwt = require('jsonwebtoken');
const passport = require('passport');

const login = (req, res) => {
    passport.authenticate('local', {session: false}, (err, user, info) => {
        if (err || !user) {
            return res.status(400).json({
                message: 'Something is not right',
                user: user
            });
        }
        req.login(user, {session: false}, (err) => {
            if (err) {
                res.send(err);
            }
            // generate a signed son web token with the contents of user object and return it in the response
            const token = jwt.sign(user, 'your_jwt_secret');
            return res.json({user, token});
        });

    })(req, res);
}

const gqlLogin = (req, res) => {
    return new Promise((resolve, reject) => {
        console.log('rq', req.body);
        // console.log('res',res)
        passport.authenticate('local', {session: false},
            async (err, user, info) => {
                try {
                    console.log("err info", err)
                    console.log("user info", user)
                    console.log("info info", info)
                    if (err || !user) {
                        reject(info.message);
                    }
                    // req.login(user, {session: false}, async (err) => {
                    //     if (err) {
                    //         reject(err);
                    //     }
                    //     // generate a signed son web token with the contents of user object and return it in the response
                        const token = jwt.sign(user, 'your_jwt_secret');
                        console.log("token", token)
                        resolve({user, token});
                    // });
                } catch (e) {
                    reject({message: e.message});
                }
            })(req, res);
    });
}

module.exports = {
    login, gqlLogin
};