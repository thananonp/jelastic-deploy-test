const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Stations = new Schema({
    // _id: {type: Schema.Types.ObjectId},
    Title: {type: String},
    Town: {type: String},
    AddressLine1: {type: String},
    StateOrProvince: {type: String},
    Postcode: {type: String},
    __v: {type: Number},
    Location: {
        coordinates: {
            type: [Number],
            required: true
        },
        type: {
            type: String,
            enum: ['Point'],
            default: 'Point'
        }
    },
    Connections: {
        type: [
            "Mixed"
        ]
    }
}, {collection: 'stations'})








module.exports = mongoose.model('chargemapStations', Stations)
