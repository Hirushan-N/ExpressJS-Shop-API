const express = require('express'); //npm install --save express //npm install --save-dev nodemon
const app = express();
const morgan = require('morgan'); //npm install --save morgan

const productRoutes = require('./api/routes/productRoutes')
const orderRoutes = require('./api/routes/orderRoutes');

app.use(morgan('dev'));

//routes
app.use('/products',productRoutes);
app.use('/orders',orderRoutes);

//error handling
app.use((req,res,next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});

app.use((error,req,res,next) => {
    res.status(error.status || 500);
    res.json({
        error:{
            message : error.message
        }
    });
});


module.exports = app;