const db = require("../db/connection");

function Roles() {
  Roles.prototype.viewRoles = function () {
    const sql = `SELECT roles.*, department.name
                          AS department_name
                          FROM roles
                          LEFT JOIN department
                          ON roles.department_id = department.id`;
    db.promise()
      .query(sql)
      .then(([rows, fields]) => {

        let tableRows = [];

        for (let row of rows) {
          let item = {
            title: row.title,
            salary: row.salary,
            department: row.department_name,
          };
          tableRows.push(item);
        }
        console.table(" ");
        console.table(tableRows);
      });
  };

  Roles.prototype.addRole = function (title, salary, department_id) {
    const sql = `INSERT INTO roles (title, salary, department_id)
                    VALUES(?, ?, ?)`;
    salary = parseInt(salary);
    const params = [title, salary, department_id];
    db.promise()
      .query(sql, params)
      .then(([rows, fields]) => {
        console.log("");
        console.log("Role added");
      });
  };
}

module.exports = { Roles };

