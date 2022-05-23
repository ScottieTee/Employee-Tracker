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
