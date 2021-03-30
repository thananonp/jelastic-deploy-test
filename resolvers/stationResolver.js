const Station = require('../models/Stations')

module.exports = {
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