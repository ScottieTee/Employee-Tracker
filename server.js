const express = require('express');
const mysql = require('mysql2');
const inputCheck = require('./utils/inputCheck');

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

// Get all departments
app.get('/api/department', (req, res) => {
    const sql = `SELECT * FROM department`;
  
    db.query(sql, (err, rows) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({
        message: 'success',
        data: rows
      });
    });
  });

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

// Get all roles
app.get('/api/roles', (req, res) => {
    const sql = `SELECT * FROM roles`;
  
    db.query(sql, (err, rows) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({
        message: 'success',
        data: rows
      });
    });
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

// Get all employees
app.get('/api/employees', (req, res) => {
    const sql = `SELECT * FROM employees`;
  
    db.query(sql, (err, rows) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({
        message: 'success',
        data: rows
      });
    });
  });

// Get a single employee (to update their record)
app.get('/api/employees/:id', (req, res) => {
    const sql = `SELECT * FROM employees WHERE id = ?`;
    const params = [req.params.id];
  
    db.query(sql, params, (err, row) => {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
      res.json({
        message: 'success',
        data: row
      });
    });
  });

// Also add an employee??
app.post('/api/employees', ({ body }, res) => {
    const errors = inputCheck(body, 'first_name', 'last_name', 'role_id', 'manager_id');
    if (errors) {
      res.status(400).json({ error: errors });
      return;
    }
    const sql = `INSERT INTO employees (first_name, last_name, role_id, manager_id)
  VALUES (?,?,?)`;
const params = [body.first_name, body.last_name, body.role_id, body.manager_id];

db.query(sql, params, (err, result) => {
  if (err) {
    res.status(400).json({ error: err.message });
    return;
  }
  res.json({
    message: 'success',
    data: body
  });
});
  });

// Default response for any other request (Not Found)
app.use((req, res) => {
    res.status(404).end();
  });

//Function that starts Express.js server 
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });