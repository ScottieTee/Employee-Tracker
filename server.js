const express = require('express');
const mysql = require('mysql2');

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// Connect to database
const db = mysql.createConnection(
    {
      host: 'localhost',
      // Your MySQL username,
      user: 'scotthompson',
      // Your MySQL password
      password: 'root',
      database: 'tracker'
    },
    console.log('Connected to the tracker database.')
  );

//app.get('/', (req, res) => {
    //res.json({
      //message: 'Hello World'
   // });
  //});

// Default response for any other request (Not Found)
app.use((req, res) => {
    res.status(404).end();
  });

//Function that starts Express.js server 
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });