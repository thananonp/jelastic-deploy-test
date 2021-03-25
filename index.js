'use strict';

require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const db = require('./utils/db');
const requestLogger = require('./utils/requestLogger')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}));
app.use(requestLogger)

db.on('connected', () => {
    app.listen(3000);
});

// for parsing html form x-www-form-urlencoded
// and/or app.use(express.json()); // for parsing application/json
app.use('/cat', require('./routes/catRoute'));
app.use('/chargemap', require('./routes/chargemapRoute'))

