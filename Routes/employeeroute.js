const express = require("express");
const router = express.Router();
const db = require("../../db/connection");
const cTable = require('console.table');

router.get("/employees", (req, res) => {
  const sql = `SELECT employees.*, roles.title
    AS title
    FROM employees
    LEFT JOIN roles
    ON employees.role_id = roles.id`;
  db.promise()
    .query(sql)
    .then(([rows, fields]) => {
      res.json({
        message: "success",
        data: rows,
      });
    });
});

router.get("/employee/:id", (req, res) => {
  const sql = `SELECT employees.*, roles.title 
    AS title
    FROM employees
    LEFT JOIN roles
    ON employees.role_id = roles.id
    WHERE employees.id = ?`;
  const params = req.params.id;
  db.promise()
    .query(sql, params)
    .then(([rows, fields]) => {
        res.send(rows)
      console.table([
          {
              first_name: rows[0].first_name,
              last_name: rows[0].last_name,
              title: rows[0].title,
              manager: rows[0].manager_id
          }
      ]);
    });
});

router.post("/employees", ({ body }, res) => {
    const sql = `INSERT INTO employees (first_name, last_name, role_id, manager_id)
                      VALUES (?, ?, ?, ?)`;
    const params = [body.first_name, body.last_name, body.role_id, body.manager_id];
    db.promise()
      .query(sql, params)
      .then(([rows, fields]) => {
        res.json({
          message: "success",
          data: body,
        });
      });
  });

module.exports = router;