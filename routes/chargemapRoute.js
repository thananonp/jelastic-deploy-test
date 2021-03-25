const chargeMapRouter = require('express').Router();
const Stations = require('../models/Stations');
const ObjectId = require('mongoose').Types.ObjectId;
const rectanglesBounds = require('../utils/utilFunction')

chargeMapRouter
    .route('/stations/')
    .get(async (req, res) => {
        const limit = req.query.limit ? Number(req.query.limit) : 10;
        console.log("/stations limit=", limit)
        if (req.query.topRight === undefined && req.query.bottomLeft === undefined) {
            await Stations
                .find()
                .limit(limit)
                .then(
                    (allChargeMap) => res.send(allChargeMap)
                ).catch(e => {
                    res.sendStatus(400)
                });
        } else if (req.query.topRight && req.query.bottomLeft) {
            const topRight = JSON.parse(req.query.topRight)
            const bottomLeft = JSON.parse(req.query.bottomLeft)
            const result = rectanglesBounds(topRight, bottomLeft)
            await chargeMap
                .find({
                    Location: {
                        $geoWithin: {
                            $geometry: result
                        }
                    }
                })
                .then(response => res.send(response))
                .catch(e => res.send(e))
        } else {
            res.sendStatus(400)
        }
    })
    .post(async (req, res) => {
        const receivedStation = req.body
        //validation failed
        // receivedStation.Station.Connections = req.body.Connections
        console.log(receivedStation)
        await Stations.create(receivedStation.Station)
            .then(result => res.send(result))
            .catch(e => {
                console.log(e)
                res.send(e)
            })
        // res.sendStatus(200)
    })

chargeMapRouter
    .route('/station/:id')
    .get(async (req, res) => {
        console.log(req.params.id)
        await Stations
            .find({"_id": req.params.id})
            .then(
                (chargeStation) => res.send(chargeStation)
            ).catch(e => {
                res.sendStatus(404)
            });
    })
    .delete(async (req, res) => {
        await Stations
            .deleteOne({"_id": req.params.id})
            .then(
                res.sendStatus(200)
            ).catch(e => {
                res.sendStatus(404)
            });
    })
module.exports = chargeMapRouter;
