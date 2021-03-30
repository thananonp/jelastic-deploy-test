const Station = require('../models/Stations')
const Connection = require('../models/Connections')

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
            let b = newStation.save()
            console.log(b)


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