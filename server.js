const express = require('express');
const mysql = require('mysql2');
const db = require("./db/connection");
const inputCheck = require('./utils/inputCheck');
const routes = require('./Routes/index');
const {Start} = require('./lib/Start');
const { listen } = require('express/lib/application');
const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//this may not be correct..
app.use('/api', routes);

//Start Tracker
new Start().begin();

// Expressdb.connect((err, db) => {
   // if (err) throw err; 
   // app.listen(PORT, ()=> {});
//});

// Default response for any other request (Not Found)
app.use((req, res) => {
    res.status(404).end();
  });

//Function that starts Express.js server 
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });