// FILE THAT CREATES MYSQL CONNECTION

const mysql = require('mysql');
const util = require('util');
const con = mysql.createConnection({
 host: 'localhost',
 user: 'root',
 password: '',
 database: 'newdb'
});

con.connect(function(err) {
 if (err) throw err;
 console.log('connected to database');
})

const runQuery = util.promisify(con.query).bind(con);

module.exports = runQuery;