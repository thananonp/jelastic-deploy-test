const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Connections = new Schema({
    _id: {
        type: Schema.Types.ObjectId
    },
    ConnectionTypeID: {
        type: Schema.Types.ObjectId
    },
    LevelID: {
        type: Schema.Types.ObjectId
    },
    CurrentTypeID: {
        type: Schema.Types.ObjectId
    },
    Quantity: {
        type: Number
    },
    __v: {
        type: Number
    }
}, {collection: 'connections'})
module.exports = mongoose.model('chargeMapConnection', Connections)
