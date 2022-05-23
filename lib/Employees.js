const db = require("../db/connection");

function Employees() {
  Employees.prototype.viewEmployees = function () {
    const sql = `SELECT employees.*, roles.title
    AS title
    FROM employees
    LEFT JOIN roles
    ON employees.role_id = roles.id`;
    db.promise()
      .query(sql)
      .then(([rows, fields]) => {
        let tableRows = [];

        for (let row of rows) {
          let item = {
            first_name: row.first_name,
            last_name: row.last_name,
            title: row.title,
          };
          tableRows.push(item);
        }
        console.table(" ");
        console.table(tableRows);
      });
  };

  Employees.prototype.addEmployee = function (
    first_name,
    last_name,
    role_id,
    manager_id
  ) {
    const sql = `INSERT INTO employees (first_name, last_name, role_id, manager_id)
                    VALUES(?, ?, ?, ?)`;
    const params = [first_name, last_name, role_id, manager_id];
    db.promise()
      .query(sql, params)
      .then(([rows, fields]) => {
        console.log("");
        console.log("Employee added");
      });
  };

  Employees.prototype.updateEmployeeRole = function (newRole, id) {
    const sql = `UPDATE employees SET role_id = ? 
    WHERE id = ?`;
    const params = [newRole, id];
    db.promise()
      .query(sql, params)
      .then(([rows, fields]) => {
        console.log("");
        console.log("Employee Updated!");
      });
  };

  Employees.prototype.viewManagers = function () {
    const sql = `SELECT a.*, b.last_name "Manager"
    FROM employees a JOIN employees b
    ON (a.manager_id = b.id);`;

    db.promise()
    .query(sql)
    .then(([rows, fields]) => {
      let tableData = [];

      for(let row of rows) {
        let item = {
          first_name: row.first_name,
          last_name: row.last_name,
          role_id: row.role_id,
          manager: row.Manager
        }
        tableData.push(item);
      }
      console.table(" ");
      console.table(tableData);
    })
  };
}

module.exports = { Employees };


///////




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