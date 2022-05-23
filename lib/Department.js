const db = require('../db/connection');

function Departments() {
    Departments.prototype.viewDepartments = function () {
        const sql = `SELECT * FROM department`;

        db.promise()
        .query(sql)
        .then(([rows, fields]) => {
            let tableData = [];
        
        for (let row of rows) {
            
        }
        }
        )
    }
}




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
