const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/user');
const bcrypt = require('bcrypt'); //npm install bcrypt --save


router.post("/signup",(req,res,next) => {
    User.findOne({ email: req.body.email})
                .exec()
                .then(doc => {
                    if(doc){
                        res.status(409).json({
                            message : "Email is already used"
                        });
                    }
                    else{
                        bcrypt.hash(req.body.password, 10, (err,hash)=>{
                            if(err){
                                return res.status(500).json({
                                    error:err
                                });
                            }
                            else{
                                const user = new User({
                                    _id: new mongoose.Types.ObjectId(),
                                    email:req.body.email,
                                    password:hash
                                });
                                user
                                .save()
                                .then(result =>{
                                    res.status(201).json({
                                        message : "User Created"
                                    });
                                })
                                .catch(err => {
                                    console.log(err);
                                    res.status(500).json({ error: err });
                                });
                            }
                        });
                    }
                })
                .catch(err => {
                    console.log(err);
                    res.status(500).json({ error: err });
                });
});

router.delete('/:userId', (req, res, next) => {
    const id = req.params.userId;
    User.findByIdAndRemove(id) // can use User.remove({ _id: id }) instead(cannot return the deleted object.only returns a report)
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