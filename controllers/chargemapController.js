const Stations = require('../models/station');
const Connections = require('../models/connection')
const CurrentTypes = require('../models/currentType')
const ConnectionTypes = require('../models/connectionType')
const Levels = require('../models/levelType')
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

const getStations = async (req, res) => {
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
}

const addNewStation = async (req, res) => {
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
}

const editStation = async (req, res) => {
    const receivedStation = req.body
    receivedStation.Connections = await Promise.all(receivedStation.Connections.map(async connection => {
            console.log(connection)
            return Connections
                .findOneAndUpdate({_id: connection._id}, {
                    ConnectionTypeID: ObjectId(connection.ConnectionTypeID),
                    CurrentTypeID: ObjectId(connection.CurrentTypeID),
                    LevelID: ObjectId(connection.LevelID),
                    Quantity: connection.Quantity
                })
        }
    ))
    console.log("Connections", receivedStation.Connections)
    console.log("New Array", receivedStation)
    Stations
        .findOneAndUpdate({"_id": receivedStation.Station._id}, {
            Title: receivedStation.Station.Title,
            Town: receivedStation.Station.Town,
            AddressLine1: receivedStation.Station.AddressLine1,
            StateOrProvince: receivedStation.Station.StateOrProvince,
            Postcode: receivedStation.Station.Postcode,
            Location: receivedStation.Station.Location,
            Connections: receivedStation.Connections
        }, {new: true})
        .populate(populateChild)
        .then(result => {
            console.log("result", result)
            res.send(result)
        }).catch(e => {
        console.log(e)
        res.sendStatus(400)
    })
    // console.log(editStation)

}

const getStationById = async (req, res) => {
    console.log(req.params.id)
    await Stations
        .find({"_id": req.params.id})
        .populate(populateChild)
        .then(
            (chargeStation) => res.send(chargeStation)
        ).catch(e => {
            console.log(e)
            res.sendStatus(404)
        });
}

const deleteStationById = async (req, res) => {
    await Stations
        .deleteOne({"_id": req.params.id})
        .then(
            res.sendStatus(200)
        ).catch(e => {
            console.log(e)
            res.sendStatus(404)
        });
}
module.exports = {
    getStations, addNewStation, editStation, getStationById, deleteStationById
};
