const ConnectionType = require('../models/ConnectionTypes')

module.exports = {
    Query: {
        connectiontypes: (parent, args) => {
            return ConnectionType.find()
        }
    },
    Connections: {
        ConnectionType(parent) {
            return ConnectionType
                .findById(parent.ConnectionTypeID)
        }
    }
}