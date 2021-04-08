'use strict';

require('dotenv').config();
const mongoose = require("mongoose");
const {ApolloServer} = require('apollo-server-express')
const express = require('express');
const app = express();
const PORT = 3001;
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('./utils/passportAuth');
const schemas = require('./schemas/index.js');
const resolvers = require('./resolvers/index.js');
const helmet = require('helmet')
const production = require("./sec/production");
const {localhost} = require("./sec/localhost");
const {AuthenticationError} = require("apollo-server-errors");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
// app.use(cors());


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
        server.applyMiddleware({app});

        process.env.NODE_ENV = process.env.NODE_ENV || 'development';
        if (process.env.NODE_ENV === 'production') {
            production(app, 3000);
        } else {
            localhost(app, 8000, 3000);
        }

        app.use(helmet({
            contentSecurityPolicy: false,
            ieNoOpen: false
        }))
        app.use('/cors-enabled', cors(), (req, res) => {
            res.json({msg: 'This is CORS-enabled for a Single Route'})
        })
        app.use('/auth', require('./routes/authRoute'))
        // app.use('/chargemap', checkAuth, require('./routes/chargemapRoute'))
        app.use('/chargemap', passport.authenticate('jwt', {session: false}), require('./routes/chargemapRoute'))
        app.get('/', (req, res) => {
            res.send('Hello Secure World!');
        });


        // app.listen({port: PORT}, () =>
        //     console.log(
        //         `GraphQL server =>  http://localhost:${PORT}${server.graphqlPath}`),
        //         // `GraphQL server =>  http://localhost:${PORT}${server.graphqlPath}`),
        // );


    } catch (e) {
        console.log('server error: ' + e.message);
    }
})();
