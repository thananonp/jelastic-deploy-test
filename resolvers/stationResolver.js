const Station = require('../models/Stations')
const Connection = require('../models/Connections')
const ObjectId = require('mongoose').Types.ObjectId;

module.exports = {
    Mutation: {
        addStation: async (parent, args) => {
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
        modifyStation: async (parent, args) => {
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
        deleteStation: (parent, args) => {
            return Station
                .deleteOne({_id: ObjectId(args.id)})
        }


    },
    Query: {
        station: (parent, args) => {
            return Station.findById(args.id)
        },
        stations: (parent, args) => {
            return Station
                .find()
                .limit(args.limit)
                .then(station => station)
                .catch(e => {
                    console.error(e)
                    return e
                })
        }
    }
}