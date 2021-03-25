const chargeMapRouter = require('express').Router();
const Stations = require('../models/Stations');
const Connections = require('../models/Connections')
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
                .populate('Connections')
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
                .populate('Connections')
                .then(response => res.send(response))
                .catch(e => res.send(e))
        } else {
            res.sendStatus(400)
        }
    })
    .post(async (req, res) => {
        const receivedStation = req.body
        let b = receivedStation.Connections.map(connection => {
            return {
                ConnectionTypeID: ObjectId(connection.ConnectionTypeID),
                LevelID: ObjectId(connection.LevelID),
                CurrentTypeID: ObjectId(connection.CurrentTypeID),
                Quantity: connection.Quantity
            }
        })

        let c = b.map(async connection => {
            const id = await Connections.create(connection)
            // .then(response => {
            //     // console.log(response)
            //     return response
            // }).catch(e => res.send(e))
            console.log('hee', id)
            return id._id
        })

        let d = c.map((ele)=>{
            console.log("ele",ele);
            return ele.then((val)=> val);
        })
        console.log('dddddd',d)
        // console.log("zzzsz", c)
        // receivedStation.Station.Connections = c

        //validation failed
        // receivedStation.Station.Connections = b.map(async connection => {
        //     const id = await Connections.create(connection)
        //     // .then(response => {
        //     //     // console.log(response)
        //     //     return response
        //     // }).catch(e => res.send(e))
        //     console.log('hee', id)
        //     return id._id
        // }).map((element)=>{
        //     console.log(element);
        //     return element.resolve();
        // })

        console.log('receivedStation', receivedStation)
        await Stations.create(receivedStation.Station)
            .then(result => res.send(result))
            .catch(e => {
                console.log(e)
                res.send(e)
            })
        res.sendStatus(200)
    })

chargeMapRouter
    .route('/station/:id')
    .get(async (req, res) => {
        console.log(req.params.id)
        await Stations
            .find({"_id": req.params.id})
            .populate('Connections')
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
