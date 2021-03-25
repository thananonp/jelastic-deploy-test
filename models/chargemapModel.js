const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const chargeMap = new Schema({
    _id: {type: Schema.Types.ObjectId},
    Location: {
        coordinates: {
            type: [Number],
            required: true
        },
        type: {
            type: String,
            enum: ['Point'],
            required: true
        }
    },
    Connections: {type: [Schema.Types.ObjectId]},
    Title: {type: String},
    AddressLine1: {type: Date},
    Town: {type: String},
    StateOrProvince: {type: String},
    Postcode: {type: Date},
    __v: {type: Number}
}, {collection: 'stations'})

module.exports = mongoose.model('chargeMap', chargeMap)