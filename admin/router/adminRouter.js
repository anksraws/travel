const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

const {validator} = require('./../validators/validator.js');
const {authenticate} = require('./../../authenticate.js');
const admin = require('./../controller/adminController');

router.post('/login', validator, admin.login );

module.exports = router