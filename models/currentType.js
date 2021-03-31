const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const CurrentType = new Schema({
    Description: {
        type: String
    },
    Title: {
        type: String
    }
}, {collection: 'currenttypes'})
module.exports = mongoose.model('CurrentType', CurrentType)
