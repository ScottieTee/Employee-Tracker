const mysql = require("mysql2");
//const { user, pass } = require('../secret');
require('dotenv').config();

// Connect to database
const db = mysql.createConnection(
    {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
    },
    console.log('Connected to the tracker database.')
  );

module.exports = db;