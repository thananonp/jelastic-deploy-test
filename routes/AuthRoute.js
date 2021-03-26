'use strict';
const express = require('express');
const router = express.Router();
const JWTAuth = require('../utils/JWTAuth');

router.post('/login', JWTAuth.login);

module.exports = router;