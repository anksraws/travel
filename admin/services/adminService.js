const runQuery = require('./../../connection.js');
const moment = require('moment');

module.exports.signinService = async (data) => {
	let {
    name,
  email,
	} = data;
 let sql = `select admin_id, password from admin where email= "${email}"`;
 try{
  let result = await runQuery(sql);
  return result[0];
  }
catch(err) {
	throw err;
}
}

module.exports.assignService = async (data) => {
	let {
		booking_id,
		admin_id
	} = data;
	let sql1 = `select  driver_id from driver where flag = 0 LIMIT 1`
	 try{
  let result1 = await runQuery(sql1);
  console.log(result1);
  console.log(admin_id);
  let driver_id = result1[0].driver_id;
  let sql3 = `update booking set status = 1 , driver_id = "${driver_id}",assign_id = "${admin_id}" where booking_id = "${booking_id}" and status = 0 `;
    let result3 = await runQuery(sql3);
    console.log(result3);
    if(result3.affectedRows == 0)
    	throw new error;
    else{
      let date = moment().format('MMMM Do YYYY , h:mm:ss a');
      let logs = ["Admin with id",admin_id,"assigned driver with id", driver_id,"on",date];
      result = logs.join(' ');
      dbo.collection("adminlogs").insert({admin_id, driver_id, logs : result});
  let sql2 = `update driver set flag = 1  where driver_id = "${driver_id}"` ;
   let result2 = await runQuery(sql2);
    return result1[0];}
  }
catch(err) {
	throw err;
}
}

module.exports.getBookingService = async (data) => {
	let assign_id = data.admin_id;
let sql = `select  booking_id ,booking.driver_id, customer_id, user.name as user_name from user join booking on  user.user_id = booking.customer_id where booking.assign_id= "${admin_id}"`;
 try{
  let result = await runQuery(sql);
  return result;
  }
catch(err) {
	throw err;
}

}