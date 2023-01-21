const express = require('express');
const router = express.Router();

router.get('/',(req,res,next) => {
    res.status(200).json({
        message : "Get all orders"
    });
});

router.post('/',(req,res,next) => {
    res.status(200).json({
        message : "POST order"
    });
});

router.get('/:orderId',(req,res,next) => {
    const Id = req.params.orderId;
    res.status(200).json({
        message : "GET order by orderId",
        content : {
            orderId : Id
        }
    });
});

router.patch('/:orderId',(req,res,next) => {
    const Id = req.params.orderId;
    res.status(200).json({
        message : "Update order by orderId",
        content : {
            orderId : Id
        }
    });
});

router.delete('/:orderId',(req,res,next) => {
    const Id = req.params.orderId;
    res.status(200).json({
        message : "DELETE order by orderId",
        content : {
            orderId : Id
        }
    });
});


module.exports = router;
