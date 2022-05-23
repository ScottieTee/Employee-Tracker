const mysql = require("mysql2");
//const { user, pass } = require('../secret');

// Connect to database
const db = mysql.createConnection(
    {
      host: 'localhost',
      user: user,
      password: pass,
      database: 'tracker',
    },
    console.log('Connected to the tracker database.')
  );

module.exports = db;