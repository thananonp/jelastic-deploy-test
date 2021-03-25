const chargeMapRouter = require('express').Router();
const chargeMap = require('../models/chargemapModel');
const ObjectId = require('mongoose').Types.ObjectId;

chargeMapRouter
    .route('/:id')
    .get(async (req, res) => {
        console.log(req.params.id)
        res.send(await chargeMap.find({"_id":req.params.id}))
        // res.send(await chargeMap.find({_id:ObjectId(req.params.id)}))
        // console.log(chargeMap)
        // res.send(await chargeMap.find({"Title" : "K Supermarket Mankkaa"}))
        // res.send(await chargeMap.findById(ObjectId(req.params.id)));
    })

    // .get(async (req, res) => {
    //     res.send(await cat.findById(req.params.id));
    // })
module.exports = chargeMapRouter;
