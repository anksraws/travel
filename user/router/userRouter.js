const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

const {validator} = require('./../validators/validator.js');
const {authenticate} = require('./../../authenticate.js');
const users = require('./../controller/userController');

router.post('/signup', validator, users.signup);
router.post('/login', validator, users.login );
router.post('/createBooking', authenticate , users.booking );
router.get('/bookingDetail', authenticate ,users.bookingDetail);

module.exports = router