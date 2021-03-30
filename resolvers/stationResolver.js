const Station = require('../models/Stations')

module.exports = {
    Query: {
        station: (parent, args) => {
            return Station.findById(args.id)
        },
        stations: (parent, args) => {
            return Station
                .find()
                .then(station => station)
                .catch(e => {
                    console.error(e)
                    return e
                })
        }
    }
}