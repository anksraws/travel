const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

const {validator} = require('./../validators/validator.js');
const {authenticate} = require('./../../authenticate.js');
const driver = require('./../controller/driverController');

router.post('/signup', validator, driver.signup);
router.post('/login', validator, driver.login );

module.exports = router