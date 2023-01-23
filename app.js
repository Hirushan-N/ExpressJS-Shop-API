const express = require('express'); //npm install --save express //npm install --save-dev nodemon
const app = express();
const morgan = require('morgan'); //npm install --save morgan
const bodyParser = require('body-parser') //npm install --save body-parser
const mongoose = require('mongoose'); //npm install --save mongoose

//import routes
const productRoutes = require('./api/routes/productRoutes');
const orderRoutes = require('./api/routes/orderRoutes');
const userRoutes = require('./api/routes/userRoutes')

//MongoDB connection
mongoose.Promise = global.Promise;
mongoose.set('strictQuery', false);
mongoose.connect('mongodb://127.0.0.1:27017/ExpressJS_Shop_API')
.then(() => console.log('Connected to DB!'));



app.use(morgan('dev'));
app.use('/uploads',express.static('uploads'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use((req,res,next) => {
    res.header(
        "Access-Control-Allow-Origin",
        "*"
    );
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested_With,Content_type,Accept,Authorization"
    );
    if(req.method === 'PRTIONS'){
        res.header(
            "Access-Control-Allow-Methods",
            "PUT,POST,PATCH.DELETE,GET"
        );
        return res.status(200).json({});
    }
    next();
}); 

//routes
app.use('/products',productRoutes);
app.use('/orders',orderRoutes);
app.use('/users',userRoutes);

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