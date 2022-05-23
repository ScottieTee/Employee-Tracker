const express = require("express");
const router = express.Router();
const db = require("../db/connection");

router.get("/departments", (req, res) => {
  const sql = "SELECT * FROM departments";
  db.promise()
    .query(sql)
    .then(([rows, fields]) => {
      res.json({
        message: "success",
        data: rows,
      });
    });
});

router.get("/department/:id", (req, res) => {
  const sql = `SELECT employees.*, departments.name
    AS department_name
    FROM roles
    LEFT JOIN departments
    ON roles.department_id = departments.id`;
  const params = [req.params.id];
  db.promise()
    .query(sql, params)
    .then(([rows, fields]) => {
      res.json({
        message: "success",
        data: rows,
      });
    });
});

router.post("/departments", ({ body }, res) => {
  const sql = `INSERT INTO departments (name)
                    VALUES (?)`;
  const params = [body.name];
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