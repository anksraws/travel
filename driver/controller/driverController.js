const jwt = require('jsonwebtoken')
const runQuery = require('./../../connection.js');
const bcrypt = require('bcrypt');
const Promise = require('bluebird');
const drivers = require('./../services/driverService');
const Response = require('./../../response');

module.exports.signup = (req, res) => {

let data = {
   name ,
   email ,
   password ,
   driver_lat ,
   driver_long 
  } = req.body;

  const saltRounds = 10;

 (Promise.coroutine(function* () {

  hash = yield bcrypt.hash(data.password, saltRounds);
  console.log(hash);
  try {
   const driver_id = yield drivers.signupService(data);
   let email = data.email;

  let token = jwt.sign({driver_id,email}, 'abc234').toString();
   data.driver_id = driver_id;
   data.password = hash;
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
 result = yield drivers.signinService(data);
 let hash = (result.password).toString();
  let driver_id = result.driver_id;
   const match = yield bcrypt.compare(data.password,hash);
   console.log(match);
  if(match)
  { let payload = {
    driver_id,
    email: data.email
  }
    let token = jwt.sign(payload, 'abc234').toString();
    data.driver_id = driver_id;
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
