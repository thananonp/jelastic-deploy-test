'use strict';
require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const cors = require('cors')
const passport = require('./utils/PassportAuth')
const PORT = 3000;

const db = require('./utils/db');
const requestLogger = require('./utils/requestLogger')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());
// app.use(requestLogger)

db.on('connected', () => {
    app.listen(3000);
});

// for parsing html form x-www-form-urlencoded
// and/or app.use(express.json()); // for parsing application/json
app.use('/auth', require('./routes/AuthRoute'))
app.use('/cat', require('./routes/catRoute'));
app.use('/chargemap', passport.authenticate('jwt', {session: false}), require('./routes/chargemapRoute'))

