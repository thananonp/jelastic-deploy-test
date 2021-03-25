const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const CurrentType = new Schema({
    CurrentType: {
        id: {
            type: String
        },
        Description: {
            type: String
        },
        Title: {
            type: String
        }
    }
})
module.exports = mongoose.model('chargemapCurrentType', CurrentType)
