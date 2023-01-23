const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Order = require('../models/Order');
const Product = require('../models/product');


router.get('/', (req, res, next) => {
    Order.find()
        .select('_id product quantity') // select specific fields
        .exec()
        .then((docs) => {
            console.log(docs);
            if (docs) {
                const responseContent = {
                    count: docs.length,
                    orders: docs.map(doc => {
                        return {
                            product: doc.product,
                            quantity: doc.quantity,
                            _id: doc._id,
                            reference: {
                                method: "GET",
                                url: "http://localhost:5000/orders/" + doc._id
                            }
                        }
                    })
                }
                res.status(200).json({
                    message: "Successful",
                    content: responseContent
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
    const id = req.body.product;
    Product.findById(id)
        .then((doc) => {
            console.log(doc);
            if (!doc) {
                return res.status(404).json({
                    message: 'No valid entry found for provided id'
                });
            }
            const order = new Order({
                _id: new mongoose.Types.ObjectId,
                product: req.body.product,
                quantity: req.body.quantity
            });
            return order.save();
        })
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: "Successfully Created",
                content: {
                    product: result.product,
                    quantity: result.quantity,
                    _id: result._id,
                    reference: {
                        method: "GET",
                        url: "http://localhost:5000/orders/" + result._id
                    }
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
});

router.get('/:orderId', (req, res, next) => {
    const id = req.params.orderId;
    Order.findById(id)
        .select('_id product quantity') // select specific fields
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

router.patch('/:orderId', (req, res, next) => {
    const id = req.params.orderId;
    //#region New after 2021
    Order.findByIdAndUpdate(id, { $set: req.body }, { new: true })
        .exec()
        .then((result) => {
            //console.log(result);
            res.status(200).json({
                message: "Successfully Updated",
                content: {
                    product: result.product,
                    quantity: result.quantity,
                    _id: result._id,
                    reference: {
                        method: "GET",
                        url: "http://localhost:5000/orders/" + result._id
                    }
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
    //#endregion
});

router.delete('/:orderId', (req, res, next) => {
    const id = req.params.orderId;
    Order.findByIdAndRemove(id) // can use Order.remove({ _id: id }) instead(cannot return the deleted object.only returns a report)
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
