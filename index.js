'use strict';
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
const {ValidationError} = require("apollo-server-errors");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());

const checkAuth = (req, res, next) => {
    passport.authenticate('local', function(err, user, info) {
        if (err) { return next(err); }
        if (!user) { return res.redirect('/login'); }
        req.logIn(user, function(err) {
            if (err) { return next(err); }
            return res.redirect('/users/' + user.username);
        });
    })(req, res, next);
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

        app.use('/auth', require('./routes/authRoute'))
        app.use('/chargemap', checkAuth, require('./routes/chargemapRoute'))
        // app.use('/chargemap', passport.authenticate('jwt', {session: false}), require('./routes/chargemapRoute'))

        server.applyMiddleware({app});

        app.listen({port: PORT}, () =>
            console.log(
                `GraphQL server =>  http://localhost:${PORT}${server.graphqlPath}`),
        );
    } catch (e) {
        console.log('server error: ' + e.message);
    }
})();
