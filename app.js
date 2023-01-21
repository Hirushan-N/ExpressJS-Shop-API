const express = require('express');
const app = express();

const productRoutes = require('./api/routes/productRoutes')
const orderRoutes = require('./api/routes/orderRoutes')

app.use('/products',productRoutes);
app.use('/orders',orderRoutes);


module.exports = app;