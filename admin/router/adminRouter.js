//FILE THAT CONTAINS ROUTERS FOR ADMIN API'S

const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

const {
 validator
} = require('./../validators/validator.js');
const {
 authenticateAdmin
} = require('./../../authenticate.js');
const admin = require('./../controller/adminController');

router.post('/login', validator, admin.login);
router.post('/assignDriver', authenticateAdmin, admin.assignDriver);
router.get('/getBooking', authenticateAdmin, admin.getBooking);

module.exports = router