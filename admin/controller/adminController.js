const bcrypt = require('bcrypt');
const Promise = require('bluebird');
const admins = require('./../services/adminService');
const Response = require('./../../response');
const jwt = require('jsonwebtoken');

module.exports.login = (req, res) => {
 let data = {
  name,
  email,
  password
 } = req.body;

 (Promise.coroutine(function* () {
  try{
  result = yield admins.signinService(data);
  let hash = (result.password).toString();
  let admin_id = result.admin_id;
   const match = yield bcrypt.compare(data.password,hash);
  if(match)
  {  
  let payload = {
    admin_id ,
    email : data.email
  }
    let token = jwt.sign(payload, 'abc345', { expiresIn: '3h' });
    data.admin_id = admin_id ;
    data.token = token;
    Response.message(res,200, data,' admin signed in ');
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

module.exports.assignDriver = (req, res) =>{
  let data = {admin_id} =req.decode;
  data.booking_id = req.body.booking_id;
  (Promise.coroutine(function* () {
  try{
    result = yield admins.assignService(data);
    console.log(result);
    if(result != undefined )
      {data.driver_id = result.driver_id ;
      Response.message(res,200, data,'driver assigned to a booking  ');
    }
    else
      throw new error;
      }
  catch(err){
    Response.message(res, 400,{},'error occured during booking')
  }
}))();
}

module.exports.getBooking = async (req, res) => {
  let data = {admin_id} =req.decode;
  (Promise.coroutine(function* () {
   try{
     result = yield admins.getBookingService(data);
     Response.message(res,200, result,'booking detail by admin token');
   }
   catch(err)
   {
    Response.message(res, 400,{},err)
   }
  }))();
}
