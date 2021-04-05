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

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());

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

        // const password = '1234'
        // const hash = await bcrypt.hash(password,12)
        // console.log(password,hash)

        const server = new ApolloServer({
            typeDefs: schemas,
            resolvers,
            context: async ({req, res}) => {
                if (req) {
                    const user = await checkAuth(req, res);
                    console.log('app', user);
                    if (!user) {
                        throw new ValidationError("Credential not recognized")
                    } else {
                        return {
                            req,
                            res,
                            user,
                        };
                    }
                }
            },

        });

        https.createServer(options,app).listen(8000)

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
