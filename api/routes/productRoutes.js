const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Product = require('../models/product');

router.get('/', (req, res, next) => {
    Product.find()
        .exec()
        .then((doc) => {
            console.log(doc);
            if (doc) {
                res.status(200).json({
                    message: "Successful",
                    content: doc
                });
            }
            else {
                res.status(404).json({ message: 'No valid entry found' });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
});

router.post('/', (req, res, next) => {
    const product = new Product({
        _id: new mongoose.Types.ObjectId,
        name: req.body.name,
        price: req.body.price
    });
    product
    .save()
    .then(result => {
        console.log('result');
        res.status(200).json({
            message: "Successfully Created",
            content: result
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({ error: err });
    });
});

router.get('/:productId', (req, res, next) => {
    const id = req.params.productId;
    Product.findById(id)
        .exec()
        .then((doc) => {
            console.log(doc);
            if (doc) {
                res.status(200).json({
                    message: "Successful",
                    content: doc
                });
            }
            else {
                res.status(404).json({ message: 'No valid entry found for provided id' });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
});

router.patch('/:productId', (req, res, next) => {
    const id = req.params.productId;
    //#region New after 2021
    Product.findByIdAndUpdate(id, { $set: req.body }, { new: true })
        .exec()
        .then((result) => {
            //console.log(result);
            res.status(200).json({
                message: "Successfully Updated",
                content: result
            });
        })
        .catch(err => {
            //console.log(err);
            res.status(500).json({ error: err });
        });
    //#endregion

    /* SAMPLE req FOR POSTMAN TESTING
    [
        {
            "propName": "name",
            "value": "Single Rool Book (CR)"
        }
    ]
    */

    //#region BEFORE 2021
    // const updateOps = {};
    // for(const ops of req.body){
    //     updateOps[ops.propName] = ops.value;
    // }
    // //console.log(updateOps);
    // Product.updateOne({_id:id},{$set:updateOps})
    // .exec()
    // .then((result) => {
    //     //console.log(result);
    //     res.status(200).json(result);
    // })
    // .catch(err => {
    //     //console.log(err);
    //     res.status(500).json({error:err});
    // });
    //#endregion

});

router.delete('/:productId', (req, res, next) => {
    const id = req.params.productId;
    Product.findByIdAndRemove(id) // can use Product.remove({ _id: id }) instead(cannot return the deleted object.only returns a report)
        .exec()
        .then((doc) => {
            console.log(doc);
            res.status(200).json({
                message: "Successfully Deleted",
                content: doc
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
});


module.exports = router;
