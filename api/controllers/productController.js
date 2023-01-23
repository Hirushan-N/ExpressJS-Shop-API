const mongoose = require('mongoose');
const Product = require('../models/product');


exports.Products_GET_ReadAll = (req, res, next) => {
    Product.find()
        .select('_id name price productImage') // select specific fields
        .exec()
        .then((docs) => {
            console.log(docs);
            if (docs) {
                const responseContent = {
                    count:docs.length,
                    products : docs.map(doc => {
                        return {
                            name : doc.name,
                            price : doc.price,
                            productImage : doc.productImage,
                            _id : doc._id,
                            reference : {
                                method : "GET",
                                url : "http://localhost:5000/products/" + doc._id
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
}

exports.Products_POST_Create = (req, res, next) => {
    console.log(req.file);
    const product = new Product({
        _id: new mongoose.Types.ObjectId,
        name: req.body.name,
        price: req.body.price,
        productImage : req.file.path
    });
    product 
    .save()
    .then(result => {
        console.log(result);
        res.status(201).json({
            message: "Successfully Created",
            content: {
                name : result.name,
                price:result.price,
                productImage : result.productImage,
                _id:result._id,
                reference : {
                    method : "GET",
                    url : "http://localhost:5000/products/" + result._id
                }
            }
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({ error: err });
    });
}

exports.Products_GET_ReadById = (req, res, next) => {
    const id = req.params.productId;
    Product.findById(id)
        .select('_id name price productImage') // select specific fields
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
}

exports.Products_PATCH_Update = (req, res, next) => {
    const id = req.params.productId;
    //#region New after 2021
    Product.findByIdAndUpdate(id, { $set: req.body }, { new: true })
        .exec()
        .then((result) => {
            //console.log(result);
            res.status(200).json({
                message: "Successfully Updated",
                content: {
                    name:result.name,
                    price: result.price,
                    _id:result._id,
                    reference : {
                        method : "GET",
                        url : "http://localhost:5000/products/" + result._id
                    }
                }
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

}

exports.Products_DELETE_Delete = (req, res, next) => {
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
}