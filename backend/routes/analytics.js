const express = require('express');
const router = express.Router();
const db = require('../db');

// router.get('/', (req, res) => {
//     console.log('📩 GET /analytics request received')
//   res.json({ message: 'Analytics base route working!' });
// });

router.get('/top-products', (req,res) => {
  const sql = `SELECT product_id, SUM(quantity) AS total_sold FROM orders GROUP BY product_id ORDER BY total_sold DESC LIMIT 5`;
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
    console.log("GET /sales-per-day hit");
  });
});

router.get('/sales-per-day', (req,res) => {
    const sql = `
    SELECT order_date, SUM(total_amount) AS total_sales
    FROM orders
    GROUP BY order_date
    ORDER BY order_date;
    `;

db.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching sales per day:', err.message);
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});
module.exports = router;