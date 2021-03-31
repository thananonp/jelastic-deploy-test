'use strict';
const express = require('express');
const router = express.Router();
const JWTAuth = require('../utils/jwtAuth');

router.post('/login', JWTAuth.login);

module.exports = router;