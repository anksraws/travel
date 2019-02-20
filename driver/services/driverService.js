const runQuery = require('./../../connection.js');
const moment = require('moment');

module.exports.signupService = async (result) => {
  let {
    name ,
   email ,
   password ,
   driver_lat ,
   driver_long 
  } = result;
  let sql = `insert into driver (name,email,password,driver_lat,driver_long) values ("${name}","${email}","${hash}" ,"${driver_lat}" ,"${driver_long}")`;
  try{
  let result = await runQuery(sql);
  return result.insertId;
  }
catch(err) {
	throw err;
}
};

module.exports.signinService = async (data) => {
	let {
    name,
  email,
	} = data;
 var sql = sql = `select driver_id, password from driver where email= "${email}"`;
 try{
  let result = await runQuery(sql);
  return result[0];
  }
catch(err) {
	throw err;
}
}

module.exports.statusService = async (data) => {
  let {
    driver_id,
    booking_id,
    status
  } = data;
  let sql1 = `select status from booking where booking_id= "${booking_id}"`;
  let sql2 = `update booking set status = "${status}" where booking_id = "${booking_id}"`;
  let sql3 = `update driver set flag = 0 where driver_id = "${driver_id}"`;
  
  try{
    if(status < 1  || status > 3)
      throw new error;
  let result1 = await runQuery(sql1);
  console.log(result1);
  if(result1[0].status != 0 && (result1[0].status+1) == status )
  {var result2 = await runQuery(sql2);
    let date = moment().format('MMMM Do YYYY , h:mm:ss a');
      let logs = ["Driver with id",driver_id,"changes status of booking at", date];
      result = logs.toString();
      dbo.collection("driverlogs").insert({logs:result});
   if(status == 3)
   {
  var result3 = await runQuery(sql3);
   }
   return result1[0];
  }
  else 
    throw new error('status cant be updated');
  }
catch(err) {
  throw err;
}

}

module.exports.getBookingService = async (data) => {
  let {driver_id} = data;
  let sql = `select * from booking where driver_id = "${driver_id}" and status = 3 `;
  try{
    let result = await runQuery(sql);
    return result;
  }catch (err) {
    throw err;
  }
}