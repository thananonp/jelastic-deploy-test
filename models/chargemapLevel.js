const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Level = new Schema({
    _id: {
        type: Schema.Types.ObjectId
    },
    Comments: {
        type: String
    },
    IsFastChargeCapable: {
        type: Boolean
    },
    Title: {
        type: String
    },
    __v: {
        type: Number
    }
})

module.exports = mongoose.model('chargemapLevel', Level)