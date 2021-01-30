const db = require('./connection');

//Create DB
const createDb = 'CREATE DATABASE IF NOT EXISTS dumbways'
const createTableUser = 'CREATE TABLE IF NOT EXISTS user(id int AUTO_INCREMENT, name VARCHAR(255), email VARCHAR(255), password VARCHAR(255), PRIMARY KEY (id))'
const createTableSchool = 'CREATE TABLE IF NOT EXISTS school_tb(id int AUTO_INCREMENT, NPSN int(255), name_school VARCHAR(255), address VARCHAR(255), logo_school VARCHAR(255), school_level VARCHAR(255), status_school VARCHAR(255), user_id int(255), PRIMARY KEY (id))'
db.query(createDb, (err, result) => {
  if(err) throw err;
  db.query(createTableUser, (err, result) => {
    if (err) throw err;
    console.log('table user created');
    db.query(createTableSchool, (err, result) => {
      if (err) throw err;
      console.log('table school created');
      db.end()
    })
  })
});