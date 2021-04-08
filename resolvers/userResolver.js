const {AuthenticationError} = require('apollo-server-express');
const {gqlLogin} = require('../utils/jwtAuth');

module.exports =  {
    Query: {
        login: async (parent, args, req, res) => {
            // inject username and password to req.body for passport
            console.log("args",args);
            req.body = args;
            console.log("req",req)
            try {
                const authResponse = await gqlLogin(req, res);
                console.log('authResponse', authResponse);
                return {
                    id: authResponse.user.id,
                    username: authResponse.user.username,
                    token: authResponse.token,
                };
            } catch (e) {
                console.error(e)
                throw new AuthenticationError('invalid credentials');
            }
        },
    },
};