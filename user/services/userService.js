//FILE THAT CONTAINS SQL QUERY FOR DRIVER CONTROLLER FUNCTIONS

const runQuery = require('./../../connection.js');

/** @function <b> signupService </b> <br>
* Runs the query to insert new user to db
* @param {Object}  data : {name, email, password, user_lat, user_long}
* @return {integer} user_id
*/
module.exports.signupService = async (data) => {
 let {
  name,
  email,
  password,
  user_lat,
  user_long
 } = data;
 let sql = `insert into user (name,email,password,user_lat,user_long) values ("${name}","${email}","${hash}" ,"${user_lat}" ,"${user_long}")`;
 try {
  let result = await runQuery(sql);
  return result.insertId;
 } catch (err) {
  throw err;
 }
};

/** @function <b> signinService </b> <br>
* @param {Object}  data : {name, email}
* @return {integer} with {user_id, password}
*/
module.exports.signinService = async (data) => {
 let {
  name,
  email,
 } = data;
 var sql = `select user_id, password from user where email= "${email}"`;
 try {
  let result = await runQuery(sql);
  return result[0];
 } catch (err) {
  throw err;
 }
}

/** @function <b> bookingService </b> <br>
* Runs the query of insert to make a booking 
* @param {Object}  data : {customer_id, pick_lat, pick_long, drop_lat, drop_long}
* @return {Object} of insert query
*/
module.exports.bookingService = async (data) => {
 let {
  customer_id,
  pick_lat,
  pick_long,
  drop_lat,
  drop_long
 } = data;
 let sql1 = `SET foreign_key_checks = 0`;
 let sql2 = `insert into booking (customer_id, pick_lat, pick_long , drop_lat, drop_long,driver_id, status) VALUES ("${customer_id}","${pick_lat}","${pick_long}","${drop_lat}","${drop_long}",0,0)`;
 let sql3 = `SET foreign_key_checks = 1`;
 try {
  let result1 = await runQuery(sql1);
  let result2 = await runQuery(sql2);
  let result3 = await runQuery(sql3);
  return result2;
 } catch (err) {
  throw err;
 }
}

/** @function <b> detailService </b> <br>
* Runs the query of select to get all bookings 
* @param {Object}  data : {customer_id}
* @return {Object} with {user_name, driver_id, booking_id, pick_lat, pick_long,drop_lat,drop_long, date_time}
*/
module.exports.detailService = async (data) => {

 let {
  customer_id
 } = data;
 let sql = `select user.name , driver_id, booking_id, pick_lat, pick_long,drop_lat,drop_long, date_time from user join booking on user.user_id = booking.customer_id where booking.customer_id = "${customer_id}"`;
 try {
  let result = await runQuery(sql);
  return result;
 } catch (err) {
  throw err;
 }

}