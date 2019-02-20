const jwt = require('jsonwebtoken');
//const utils = require('utils');
const runQuery = require('./../../connection.js');
const bcrypt = require('bcrypt');
const Promise = require('bluebird');
const users = require('./../services/userService');
const Response = require('./../../response.js');

module.exports.signup = (req, res) => {

let data = {
   name ,
   email ,
   password ,
   user_lat ,
   user_long 
  } = req.body;

  const saltRounds = 10;

 (Promise.coroutine(function* () {

  hash = yield bcrypt.hash(data.password, saltRounds);
  try {
   const user_id = yield users.signupService(data);
   let email = data.email;
  let token = jwt.sign({user_id,email}, 'abc123').toString();
   data.user_id = user_id;
   data.password = hash;
   data.token = token;
   Response.message(res, 200,data,'user sucessfully inserted');
  } catch (err) {
    Response.message(res, 400,{},'error occured during signup')
  }
  }))();
};



module.exports.login = (req, res) => {
 let data = {
  name,
  email,
  password
 } = req.body;
 (Promise.coroutine(function* () {
  try{
 result = yield users.signinService(data);
 let hash = (result.password).toString();
  let user_id = result.user_id;
   const match = yield bcrypt.compare(data.password,hash);
  if(match == true)
  { let payload = {
    user_id,
    email: data.email
  }
    let token = jwt.sign(payload, 'abc123').toString();
    data.user_id = user_id;
    data.token = token;
    Response.message(res,200, data,' user signed in ');
  }
  else {
    throw new error;
  }
}
catch(err){
  Response.message(res, 400,{},'error occured during signin')
}

 }))();
 
}

module.exports.booking = (req,res) => {
  let data = {
    customer_id : req.decode.user_id,
  email : req.decode.email,
  pick_lat : req.body.pick_lat,
  pick_long : req.body.pick_long,
  drop_lat : req.body.drop_lat,
  drop_long : req.body.drop_long
 } ;
 (Promise.coroutine(function* () {
  try{
    result = yield users.bookingService(data);
    if(result.affectedRows == 1)
      Response.message(res,200, data,' booking done ');
    else
      throw new error;
      }
  catch(err){
    Response.message(res, 400,{},'error occured during booking')
  }
}))();

  
}

module.exports.bookingDetail = (req,res) => {
  let data ={
    customer_id : req.decode.user_id
  };

  //console.log(customer_id);
(Promise.coroutine(function* () {
  try{
    result = yield users.detailService(data);
    if(result)
      Response.message(res,200, result,' booking done ');
    else
      throw new error;
      }
  catch(err){
    Response.message(res, 400,{},'error occured during booking')
  }
}))();

}
