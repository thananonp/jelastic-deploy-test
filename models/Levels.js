const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Levels = new Schema({
    Comments: {
        type: String
    },
    IsFastChargeCapable: {
        type: Boolean
    },
    Title: {
        type: String
    }
},{collection:'levels'})

module.exports = mongoose.model('levels', Levels)