const runQuery = require('./../../connection.js');

module.exports.signupService = async (result) => {
	let {
   name,
   email,
   password,
   user_lat,
   user_long
  } = result;
  let sql = `insert into user (name,email,password,user_lat,user_long) values ("${name}","${email}","${hash}" ,"${user_lat}" ,"${user_long}")`;
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
 var sql = sql = `select user_id, password from user where email= "${email}"`;
 try{
  let result = await runQuery(sql);
  return result[0];
  }
catch(err) {
	throw err;
}
}

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
  try{
  let result1 = await runQuery(sql1);
  let result2 = await runQuery(sql2);
  let result3 = await runQuery(sql3);
  return result2;
  }
catch(err) {
  throw err;
}
}

module.exports.detailService = async (data) => {
 
 let {
  customer_id
 } = data;
//var sql = "SELECT users.name AS user, products.name AS favorite FROM users JOIN products ON users.favorite_product = products.id";
 let sql =`select user.name , driver_id, booking_id, pick_lat, pick_long,drop_lat,drop_long, date_time from user join booking on user.user_id = booking.customer_id where booking.customer_id = "${customer_id}"`;
 try{
  let result = await runQuery(sql);
  console.log(result);
  return result;
  }
catch(err) {
  throw err;
}

}