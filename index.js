'use strict';
require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const cors = require('cors')
const passport = require('./utils/PassportAuth.js')
const PORT = 3000;

const db = require('./utils/db');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());

db.on('connected', () => {
    app.listen(PORT);
});

app.use('/auth', require('./routes/AuthRoute'))
app.use('/chargemap', passport.authenticate('jwt', {session: false}), require('./routes/chargemapRoute'))

