const Connection = require('../models/Connections')

module.exports = {
    Query: {
        connection: (parent, args) => {
            return Connection.findById(args.id)
        },
        connections: (parent, args) => {
            // console.log("stations")
            return Connection
                .find()
                .then(connection => connection)
                .catch(e => {
                    console.error(e)
                    return e
                })
        }
    },
    Station: {
        Connections(parent) {
            console.log("Parent", parent.Connections)
            return parent.Connections.map(async connection => {
                return Connection
                    .findById(connection)
                    .then(
                        connection => {
                            console.log(connection)
                            return connection
                        }
                    )
                    .catch(e => {
                        console.log(e)
                        return e
                    })
            })


        }
    }
}