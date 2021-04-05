'use strict';
const https = require('https')
const fs = require('fs')
require('dotenv').config();
const mongoose = require("mongoose");
const {ApolloServer} = require('apollo-server-express')
const express = require('express');
const app = express();
const PORT = 3000;
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('./utils/passportAuth');
const schemas = require('./schemas/index.js');
const resolvers = require('./resolvers/index.js');
const bcrypt = require("bcrypt");
const {ValidationError} = require("apollo-server-errors");
const helmet = require('helmet')
const JWTAuth = require("./utils/jwtAuth");
const jwt = require("jsonwebtoken");
const {AuthenticationError} = require("apollo-server-errors");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
// app.use(cors());

const sslkey = fs.readFileSync('ssl-key.pem');
const sslcert = fs.readFileSync('ssl-cert.pem')
const options = {
    key: sslkey,
    cert: sslcert
};


(async () => {
    try {
        await mongoose.connect(process.env.DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        });
        console.log('MongoDB connected successfully');

        const server = new ApolloServer({
            typeDefs: schemas,
            resolvers,
            context: async ({req, res}) => {
                if (req) {
                    const token = req.headers.authorization || '';
                    console.log("token", token)
                    passport.authenticate('local', {session: false}, (err, user, info) => {
                        console.log("error",err)
                        console.log("user",user)
                        if (err || !user) {

                            // return res.status(400).json({
                            //     message: 'Something is not right',
                            //     user: user
                            // });
                        }
                        req.login(user, {session: false}, (err) => {
                            if (err) {
                                res.send(err);
                            }
                            // generate a signed son web token with the contents of user object and return it in the response
                            const token = jwt.sign(user, 'your_jwt_secret');
                            console.log("Inside token", token)
                            // return res.json({user, token});
                        });

                    })(req, res);

                    console.log('user', user);
                    if (user) {
                        return {
                            req,
                            res,
                            user,
                        };
                    } else {
                        throw new AuthenticationError("Credential not recognized")
                    }
                }
            },

        });

        // https.createServer(options, app).listen(8000)
        app.use(helmet({
            ieNoOpen: false
        }))


        app.use('/cors-enabled', cors(), (req, res, next) => {
            res.json({msg: 'This is CORS-enabled for a Single Route'})
        })
        app.use('/auth', require('./routes/authRoute'))
        // app.use('/chargemap', checkAuth, require('./routes/chargemapRoute'))
        app.use('/chargemap', passport.authenticate('jwt', {session: false}), require('./routes/chargemapRoute'))

        server.applyMiddleware({app});

        app.listen({port: PORT}, () =>
            console.log(
                `GraphQL server =>  http://localhost:${PORT}${server.graphqlPath}`),
        );
    } catch (e) {
        console.log('server error: ' + e.message);
    }
})();
