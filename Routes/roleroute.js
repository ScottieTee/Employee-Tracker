const express = require("express");
const router = express.Router();
const db = require("../db/connection");


router.get("/roles", async (req, res) => {
  const sql = `SELECT roles.*, departments.name
                      AS department_name
                      FROM roles
                      LEFT JOIN departments
                      ON roles.department_id = departments.id`;
  db.promise()
    .query(sql)
    .then(([rows, fields]) => {
      res.json({
        message: "success",
        data: rows,
      });
    });
});

module.exports = router;