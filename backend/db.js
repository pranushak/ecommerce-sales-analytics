const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'secret',
  database: 'orders',
  port: 3306,
  multipleStatements: true
});

db.connect((err) => {
  if (err) {
    console.error("❌ DB Connection failed:", err.message);
    return;
  }
  console.log("✅ Connected to MySQL");
})

module.exports = db;