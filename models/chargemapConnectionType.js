const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ConnectionType = new Schema({
    ConnectionType: {
        id: {
            type: String
        },
        FormalName: {
            type: String
        },
        Title: {
            type: Date
        }
    }
}, {collection: 'connectiontypes'})

module.exports = mongoose.model('chargemapConnectionType', ConnectionType)
