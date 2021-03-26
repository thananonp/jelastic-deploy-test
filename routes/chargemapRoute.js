const Stations = require('../models/Stations');
const Connections = require('../models/Connections')
const CurrentTypes = require('../models/CurrentTypes')
const ConnectionTypes = require('../models/ConnectionTypes')
const Levels = require('../models/Levels')
const rectanglesBounds = require('../utils/utilFunction')
const ObjectId = require('mongoose').Types.ObjectId;
const chargeMapRouter = require('express').Router();

const populateChild = {
    path: 'Connections', model: 'Connections',
    populate: [{
        path: 'ConnectionTypeID',
        model: ConnectionTypes
    }, {
        path: 'LevelID',
        model: Levels
    }, {
        path: 'CurrentTypeID',
        model: CurrentTypes
    }]
}

chargeMapRouter
    .route('/stations/')
    .get(async (req, res) => {
        const limit = req.query.limit ? Number(req.query.limit) : 10;
        console.log("/stations limit=", limit)
        if (req.query.topRight === undefined && req.query.bottomLeft === undefined) {
            await Stations
                .find()
                .limit(limit)
                .populate(populateChild)
                .then(
                    (allChargeMap) => res.send(allChargeMap)
                ).catch(e => {
                    console.log(e)
                    res.sendStatus(400)
                });
        } else if (req.query.topRight && req.query.bottomLeft) {
            const topRight = JSON.parse(req.query.topRight)
            const bottomLeft = JSON.parse(req.query.bottomLeft)
            const result = rectanglesBounds(topRight, bottomLeft)
            await Stations
                .find({
                    Location: {
                        $geoWithin: {
                            $geometry: result
                        }
                    }
                })
                .populate(populateChild)
                .then(response => res.send(response))
                .catch(e => res.send(e))
        } else {
            res.sendStatus(400)
        }
    })
    .post(async (req, res) => {
        const receivedStation = req.body
        let arrayForInsertingObjectId = receivedStation.Connections.map(connection => {
            return {
                ConnectionTypeID: ObjectId(connection.ConnectionTypeID),
                LevelID: ObjectId(connection.LevelID),
                CurrentTypeID: ObjectId(connection.CurrentTypeID),
                Quantity: connection.Quantity
            }
        })

        async function createConnection(array) {
            return array.map(async connection => {
                await Connections.create(connection, async (err, result) => {
                    receivedStation.Station.Connections = result
                    console.log('receivedStation', receivedStation)
                    await Stations.create(receivedStation.Station)
                        .then(async result => {
                            await Stations
                                .find({'_id': result._id})
                                .populate(populateChild)
                                .then(
                                    (allChargeMap) => res.send(allChargeMap)
                                ).catch(e => {
                                    res.sendStatus(400)
                                });
                        })
                        .catch(e => {
                            console.log(e)
                            res.send(e)
                        })
                })
            })
        }

        await createConnection(arrayForInsertingObjectId)
    })
    .patch(async (req, res) => {
        const receivedStation = req.body
        const editingIdStation = receivedStation.Station._id
        console.log(editingIdStation)
        const editStation = Stations
            .findOne({"_id": editingIdStation})
            .populate(populateChild)
            .then(result => {

            })
        console.log(editStation)

    })

chargeMapRouter
    .route('/station/:id')
    .get(async (req, res) => {
        console.log(req.params.id)
        await Stations
            .find({"_id": req.params.id})
            .populate(populateChild)
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
