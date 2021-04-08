const Station = require('../models/station')
const Connection = require('../models/connection')
const ObjectId = require('mongoose').Types.ObjectId;
const rectanglesBounds = require('../utils/utilFunction')
const {AuthenticationError} = require("apollo-server-errors");

module.exports = {
    Mutation: {
        addStation: async (parent, args, context) => {
            if (!context.user) {
                throw new AuthenticationError("authentication failed");
            }
            const connectionIDArray = args.Connections.map(connection => {
                return connection
            })
            args.Connections = await Promise.all(connectionIDArray.map(connection => {
                const generate = new Connection(connection)
                return generate.save()
            }))
            const newStation = new Station(args)
            return newStation.save()
        },
        modifyStation: async (parent, args, context) => {
            if (!context.user) {
                throw new AuthenticationError("authentication failed");
            }
            args.Connections = await Promise.all(args.Connections.map(async connection => {
                return Connection
                    .findOneAndUpdate({_id: connection.id}, {
                        ConnectionTypeID: ObjectId(connection.ConnectionTypeID),
                        CurrentTypeID: ObjectId(connection.CurrentTypeID),
                        LevelID: ObjectId(connection.LevelID),
                        Quantity: connection.Quantity
                    });
            }))
            return Station.findOneAndUpdate(args.id, args, {new: true});
        },
        deleteStation: (parent, args,context) => {
            if (!context.user) {
                throw new AuthenticationError("authentication failed");
            }
            return Station
                .deleteOne({_id: ObjectId(args.id)})
        }


    },
    Query: {
        station: (parent, args) => {
            return Station.findById(args.id)
        },
        stations: (parent, args) => {
            if (args.bounds) {
                return Station
                    .find({
                        Location: {
                            $geoWithin: {
                                $geometry: rectanglesBounds(args.bounds._northEast, args.bounds._southWest)
                            }
                        }
                    })
                    .limit(args.limit ? args.limit : 10)
            } else {
                return Station
                    .find()
                    .limit(args.limit ? args.limit : 10)
                    .then(station => station)
                    .catch(e => {
                        console.error(e)
                        return e
                    })
            }
        }
    }
}