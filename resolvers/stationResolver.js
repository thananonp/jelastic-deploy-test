const Station = require('../models/Stations')
const Connection = require('../models/Connections')
const ObjectId = require('mongoose').Types.ObjectId;

module.exports = {
    Mutation: {
        addStation: async (parent, args) => {
            console.log(args)
            let connectionIDArray = args.Connections.map(connection => {
                return connection
            })
            console.log("connectionIDArray", connectionIDArray)

            let generate = await Promise.all(connectionIDArray.map(connection => {
                const generate = new Connection(connection)
                return generate.save()
            }))

            console.log("generate", generate)
            const newArgs = {...args}
            newArgs.Connections = generate
            console.log("newArgs", newArgs)
            const newStation = new Station(newArgs)
            let b = await newStation.save()
            console.log("B", b)
            return b
        },
        modifyStation: async (parent, args) => {
            console.log("All Connections", args.Connections)
            const editConnection = args.Connections
            const newConnection = await Promise.all(editConnection.map(async connection => {
                console.log("connection", connection)
                return Connection
                    .findOneAndUpdate({_id: connection.id}, {
                        ConnectionTypeID: ObjectId(connection.ConnectionTypeID),
                        CurrentTypeID: ObjectId(connection.CurrentTypeID),
                        LevelID: ObjectId(connection.LevelID),
                        Quantity: connection.Quantity
                    });
            }))
            console.log(newConnection)
            args.Connections = newConnection
            return Station.findOneAndUpdate(args.id, args);
        }


    },
    Query: {
        station: (parent, args) => {
            return Station.findById(args.id)
        },
        stations: (parent, args) => {
            console.log("args", args)
            console.log("stations")
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