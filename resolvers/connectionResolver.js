const Connection = require('../models/Connections')

module.exports = {
    Query: {
        connection: (parent, args) => {
            return Connection.findById(args.id)
        },
        connections: (parent, args) => {
            console.log("stations")
            return Connection
                .find()
                .then(connection => connection)
                .catch(e => {
                    console.error(e)
                    return e
                })
        }
    }
}