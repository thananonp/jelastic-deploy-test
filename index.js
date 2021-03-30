'use strict';
const mongoose = require("mongoose");
const {ApolloServer} = require('apollo-server-express')
require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const cors = require('cors')
const passport = require('./utils/PassportAuth')
const PORT = 3000;

// const db = require('./utils/db');
const requestLogger = require('./utils/requestLogger')
const schemas = require('./schemas/index.js')
const resolvers = require('./resolvers/index.js')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());
// app.use(requestLogger)

(async () => {
    try {
        await mongoose.connect(process.env.DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        });
        console.log('DB connected successfully');

        const server = new ApolloServer({
            typeDefs: schemas,
            resolvers,
        });

        // const app = express();


// and/or app.use(express.json()); // for parsing application/json
        app.use('/auth', require('./routes/AuthRoute'))
// app.use('/cat', require('./routes/catRoute'));
        app.use('/chargemap', passport.authenticate('jwt', {session: false}), require('./routes/chargemapRoute'))

        server.applyMiddleware({app});

        app.listen({port: 3000}, () =>
            console.log(
                `🚀 Server ready at http://localhost:3000${server.graphqlPath}`),
        );
    } catch (e) {
        console.log('server error: ' + e.message);
    }
})();

// for parsing html form x-www-form-urlencoded

