//FILE THAT CONTAINS MAIN LOGIC FOR DRIVER API'S

const jwt = require('jsonwebtoken')
const runQuery = require('./../../connection.js');
const bcrypt = require('bcrypt');
const Promise = require('bluebird');
const drivers = require('./../services/driverService');
const Response = require('./../../response');

/** @function <b> signup </b> <br>
* Register a new driver
* @param {Object} req
* @return {Object} response object
*/
module.exports.signup = (req, res) => {

 let data = {
  name,
  email,
  password,
  driver_lat,
  driver_long
 } = req.body;

 const saltRounds = 10;

 (Promise.coroutine(function*() {

  hash = yield bcrypt.hash(data.password, saltRounds);
  try {
   const driver_id = yield drivers.signupService(data);
   let email = data.email;

   let token = jwt.sign({
    driver_id,
    email
   }, 'abc234').toString();
   data.driver_id = driver_id;
   data.password = hash;
   Response.message(res, 200, data, 'user sucessfully inserted');
  } catch (err) {
   Response.message(res, 400, {}, 'error occured during signup')
  }
 }))();
};


/** @function <b> login </b> <br>
* Signing in the registered driver
* @param {Object} req
* @return {Object} response object
*/
module.exports.login = (req, res) => {
 let data = {
  name,
  email,
  password
 } = req.body;
 
 (Promise.coroutine(function*() {
  try {
   result = yield drivers.signinService(data);
   let hash = (result.password).toString();
   let driver_id = result.driver_id;
   const match = yield bcrypt.compare(data.password, hash);
   if (match) {
    let payload = {
     driver_id,
     email: data.email
    }
    let token = jwt.sign(payload, 'abc234').toString();
    data.driver_id = driver_id;
    data.token = token;
    Response.message(res, 200, data, ' user signed in ');
   } else {
    throw new error;
   }
  } catch (err) {
   Response.message(res, 400, {}, 'error occured during signin')
  }

 }))();

}

/** @function <b> changeStatus </b> <br>
* Rgistered driver can change the status of his booking
* @param {Object} req
* @return {Object} response object
*/
module.exports.changeStatus = (req, res) => {
 let data = {
  driver_id
 } = req.decode;
 data.booking_id = req.body.booking_id;
 data.status = req.body.status;
 (Promise.coroutine(function*() {
  try {
   let result = yield drivers.statusService(data);
   Response.message(res, 200, data, ' status successfully changed');
  } catch (err) {
   Response.message(res, 400, {}, 'error occured during change of status');
  }

 }))();

}

/** @function <b> getBookings </b> <br>
* Rgistered driver geting the completed booking history
* @param {Object} req
* @return {Object} response object
*/
module.exports.getBookings = (req, res) => {
 let data = {
  driver_id
 } = req.decode;
 (Promise.coroutine(function*() {
  try {
   let result = yield drivers.getBookingService(data);
   if (result[0] == undefined)
    throw new error;
   Response.message(res, 200, result, ' history of booking ');
  } catch (err) {
   Response.message(res, 400, {}, 'No history of booking ');
  }
 }))();

}