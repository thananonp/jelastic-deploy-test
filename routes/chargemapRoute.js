const chargeMapRouter = require('express').Router();
const chargeMap = require('../models/chargemapModel');
const ObjectId = require('mongoose').Types.ObjectId;

chargeMapRouter
    .route('/stations/')
    .get(async (req, res) => {
        const limit = req.query.limit ? Number(req.query.limit) : 10;
        console.log("/stations limit=", limit)
        await chargeMap
            .find()
            .limit(limit)
            .then(
                (allChargeMap) => res.send(allChargeMap)
            ).catch(e => {
                res.sendStatus(400)
            });
    })

chargeMapRouter
    .route('/station/:id')
    .get(async (req, res) => {
        console.log(req.params.id)
        await chargeMap
            .find({"_id": req.params.id})
            .then(
                (chargeStation) => res.send(chargeStation)
            ).catch(e => {
                res.sendStatus(404)
            });
    })
module.exports = chargeMapRouter;
