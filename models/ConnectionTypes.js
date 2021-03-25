const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ConnectionTypes = new Schema({
    FormalName: {
        type: String
    },
    Title: {
        type: Date
    }

}, {collection: 'connectiontypes'})

module.exports = mongoose.model('ConnectionTypes', ConnectionTypes)
