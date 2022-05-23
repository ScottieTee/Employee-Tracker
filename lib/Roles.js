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