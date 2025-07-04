const express = require('express');
const app = express();
const port = 3000;
const uploadRoutes = require('./routes/upload');
const cors = require('cors');


app.use(cors());
app.use('/upload',uploadRoutes);

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
})