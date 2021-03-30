const ConnectionType = require('../models/ConnectionTypes')

module.exports = {
    Query: {
        connectiontypes: (parent, args) => {
            return ConnectionType.find()
        }
    },
    Connections: {
        ConnectionType(parent) {
            // console.log(parent)
            return ConnectionType
                .findById(parent.ConnectionTypeID)
                .then(level => level)
                .catch(e => {
                    console.error(e)
                    return e
                })
        }
    }
}