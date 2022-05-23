const db = require('../db/connection');

function Departments() {
    Departments.prototype.viewDepartments = function () {
        const sql = `SELECT * FROM department`;

        db.promise()
        .query(sql)
        .then(([rows, fields]) => {
            let tableData = [];
        
        for (let row of rows) {
            let item = {
                department: row.name,
              };
              tableData.push(item);
            }
            console.table(" ");
            console.table(tableData);
          });
      };
    
      Departments.prototype.addDepartment = function (name) {
        const sql = `INSERT INTO department (name)
                        VALUES(?)`;
        db.promise()
          .query(sql, name)
          .then(([rows, fields]) => {
            console.log(" ");
            console.log("Department added");
          });
      };
    }
    
    module.exports = {
      Departments,
    };    
   
