const runQuery = require('./../../connection.js');

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