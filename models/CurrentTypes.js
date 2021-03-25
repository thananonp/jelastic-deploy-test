const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const CurrentTypes = new Schema({
    Description: {
        type: String
    },
    Title: {
        type: String
    }
}, {collection: 'currenttypes'})
module.exports = mongoose.model('CurrentTypes', CurrentTypes)
