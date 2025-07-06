const express = require('express');
const router = express.Router();
const multer = require('multer');
const fs = require('fs');
const csv = require('csv-parser');
const db = require('../db');



const upload = multer({dest : './uploads/'});

router.post('/', upload.single('file'), (req, res) => {
    if(!req.file) {
        return res.status(400).json({ error: 'No file uploaded.' });
    }
    console.log('req file', req.file)
    const results =[];
    fs.createReadStream(req.file.path).pipe(csv())
    .on('data', (data) => {
        results.push([
        data.order_id,
        data.order_date,
        parseInt(data.user_id),
        parseInt(data.product_id),
        parseInt(data.quantity),
        parseFloat(data.price),
        parseFloat(data.total_amount),
        data.country,
        data.city
        ])
    }).on('end', () => {
        const sql = ` INSERT INTO orders (order_id, order_date, user_id, product_id, quantity, price, total_amount, country, city)
        VALUES ?  `;
       db.query(sql, [results], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'CSV uploaded and data inserted successfully.' });
      });
    })
});

module.exports = router;