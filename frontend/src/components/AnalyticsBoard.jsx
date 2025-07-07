import React, { useEffect, useState } from "react";
import axios from 'axios';

export default function AnalyticsDashboard() {
    const [salesPerDay, setSalesPerDay] = useState([]);
    const [topProducts, setTopProducts] = useState([]);

    useEffect(() => {
        fetchSalesPerDay();
        fetchTopProducts();
    }, []);

    const fetchSalesPerDay = async () => {
        try {
            const res = await axios.get('http://localhost:3000/analytics/sales-per-day');
            setSalesPerDay(res.data);
        } catch (err) {
            console.error("Failed to fetch sales-per-day", err.message);
        }
    };

    const fetchTopProducts = async () => {
        try{
            const res = await axios.get('http://localhost:3000/analytics/top-products');
            setTopProducts(res.data);
        } catch (err){
            console.log("Failed to fetch top-products",err.message);
        }   
    };

    return (
         <div style={{ padding: '2rem' }}>
      <h2>Analytics Dashboard</h2>

      <section>
        <h3>Daily Sales</h3>
        <table border="1" cellPadding="5">
          <thead>
            <tr>
              <th>Date</th>
              <th>Total Sales</th>
            </tr>
          </thead>
          <tbody>
            {salesPerDay.map((row, idx) => (
              <tr key={idx}>
                <td>{row.order_date}</td>
                <td>${parseFloat(row.total_sales).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section style={{ marginTop: '2rem' }}>
        <h3>🏆 Top 5 Products</h3>
        <table border="1" cellPadding="5">
          <thead>
            <tr>
              <th>Product ID</th>
              <th>Total Sold</th>
            </tr>
          </thead>
          <tbody>
            {topProducts.map((product, idx) => (
              <tr key={idx}>
                <td>{product.product_id}</td>
                <td>{product.total_sold}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
    );
}
