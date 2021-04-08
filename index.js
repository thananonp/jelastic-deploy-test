'use strict';
const https = require('https')
const http = require('http');
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
const helmet = require('helmet')
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
                    passport.authenticate('jwt', {session: false}, (err, user) => {
                        if (err || !user) {
                            throw new AuthenticationError("Credential not recognized")
                        } else {
                            return {
                                user
                            };
                        }
                    })(req, res);
                }
            },

        });

        https.createServer(options, app).listen(8000)
        http.createServer((req, res) => {
            res.writeHead(301, { 'Location': 'https://localhost:8000' + req.url });
            res.end();
        }).listen(3001);

        app.use ((req, res, next) => {
            if (req.secure) {
                // request was via ttps, so do no special handling
                console.log("secure")
                next();
            } else {
                // request was via http, so redirect to https
                console.log("normal HTTP")
                res.redirect('https://' + req.headers.host + req.url);
            }
        });

        app.use('/cors-enabled', cors(), (req, res) => {
            res.json({msg: 'This is CORS-enabled for a Single Route'})
        })
        app.use('/auth', require('./routes/authRoute'))
        // app.use('/chargemap', checkAuth, require('./routes/chargemapRoute'))
        app.use('/chargemap', passport.authenticate('jwt', {session: false}), require('./routes/chargemapRoute'))
        app.get('/', (req, res) => {
            res.send('Hello Secure World!');
        });

        server.applyMiddleware({app});

        app.listen({port: PORT}, () =>
            console.log(
                `GraphQL server =>  https://localhost:${PORT}${server.graphqlPath}`),
                // `GraphQL server =>  http://localhost:${PORT}${server.graphqlPath}`),
        );

        app.use(helmet({
            ieNoOpen: false
        }))

    } catch (e) {
        console.log('server error: ' + e.message);
    }
})();
