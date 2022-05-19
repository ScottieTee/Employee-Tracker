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

//Query that requests a list of all departments
db.query(`SELECT * FROM department`, (err, rows) => {
    console.log(rows);
  });
// GET a single department
//db.query(`SELECT * FROM department WHERE id = //hidden variable will go here//`, (err, row) => {
   // if (err) {
  //    console.log(err);
  //  }
  //  console.log(row);
 // });

 //Add a department
const sql = `INSERT INTO department (name) 
VALUES (?)`;
const params = [//user adds the name variable of the new department//];

db.query(sql, params, (err, result) => {
if (err) {
console.log(err);
}
console.log(result);
});

//Add a role
const sql = `INSERT INTO roles (title, salary, department) 
VALUES (?, ?, ?)`;
const params = [//user adds the name variable of the new department//];

db.query(sql, params, (err, result) => {
if (err) {
console.log(err);
}
console.log(result);
});

//Add an employee
const sql = `INSERT INTO employees (first_name, last_name, role_id, manager_id) 
VALUES (?, ?, ?)`;
const params = [//user adds the name variable of the new department//];

db.query(sql, params, (err, result) => {
if (err) {
console.log(err);
}
console.log(result);
});

// Default response for any other request (Not Found)
app.use((req, res) => {
    res.status(404).end();
  });

//Function that starts Express.js server 
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });