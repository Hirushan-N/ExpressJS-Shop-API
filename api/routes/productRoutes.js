const express = require('express');
const router = express.Router();

router.get('/',(req,res,next) => {
    res.status(200).json({
        message : "Get all products"
    });
});

router.post('/',(req,res,next) => {
    res.status(200).json({
        message : "POST product"
    });
});

router.get('/:productId',(req,res,next) => {
    const Id = req.params.productId;
    res.status(200).json({
        message : "GET product by productId",
        content : {
            productId : Id
        }
    });
});

router.patch('/:productId',(req,res,next) => {
    const Id = req.params.productId;
    res.status(200).json({
        message : "Update product by productId",
        content : {
            productId : Id
        }
    });
});

router.delete('/:productId',(req,res,next) => {
    const Id = req.params.productId;
    res.status(200).json({
        message : "DELETE product by productId",
        content : {
            productId : Id
        }
    });
});


module.exports = router;
