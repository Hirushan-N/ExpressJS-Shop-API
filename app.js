const express = require('express');
const app = express();

const productRoutes = require('./api/routes/productRoutes')

app.use('/products',productRoutes);

module.exports = app;