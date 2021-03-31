'use strict';
require('dotenv').config();
const mongoose = require("mongoose");
const {ApolloServer} = require('apollo-server-express')
const express = require('express');
const app = express();
const PORT = 3000;
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('./utils/PassportAuth');
const schemas = require('./schemas/index.js');
const resolvers = require('./resolvers/index.js');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());

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
        });

        app.use('/auth', require('./routes/authRoute'))
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
