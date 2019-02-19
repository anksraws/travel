const runQuery = require('./../../connection.js');

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