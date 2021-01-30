const mysql = require('mysql');

//Create connection
const db = mysql.createConnection({
  host      : '127.0.0.1',
  user      : 'root',
  password  : '123456',
  database  : 'dumbways'
});

module.exports = db