const Connection = require('../models/connection')

module.exports = {
    Query: {
        connection: (parent, args) => {
            return Connection.findById(args.id)
        },
        connections: (parent, args) => {
            return Connection
                .find()
        }
    },
    Station: {
        Connections(parent) {
            return parent.Connections.map(async connection =>
                Connection
                    .findById(connection)
            )


        }
    }
}