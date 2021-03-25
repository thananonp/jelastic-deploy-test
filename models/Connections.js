const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Connections = new Schema({
    ConnectionTypeID: {
        type: Schema.Types.ObjectId, ref: 'ConnectionTypes'
    },
    LevelID: {
        type: Schema.Types.ObjectId, ref: 'Levels'
    },
    CurrentTypeID: {
        type: Schema.Types.ObjectId, ref: 'CurrentTypes'
    },
    Quantity: {
        type: Number
    }
}, {collection: 'connections'})
module.exports = mongoose.model('Connections', Connections)
