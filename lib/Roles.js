const db = require("../db/connection");

function Roles() {
  Roles.prototype.viewRoles = function () {
    const sql = `SELECT roles.*, departments.name
                          AS department_name
                          FROM roles
                          LEFT JOIN departments
                          ON roles.department_id = departments.id`;
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




////



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