const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// const blogSchema = new Schema({
//     title:  String,
//     author: String,
//     body:   String,
//     comments: [{ body: String, date: Date, author: String }],
//     date: { type: Date, default: Date.now },
//     hidden: Boolean,
//     meta: {
//         votes: Number,
//         favs:  Number
//     }
// });


const catSchema = new Schema({
    name: String,
    age: {type: Number, min: [0, 'your cat born yet?'], max: [42, 'world record!']},
    gender: {type: String, enum: ['male', 'female']},
    date: {type: Date, default: Date.now()},
    color: String,
    weight: Number
})

module.exports = mongoose.model('Cat', catSchema)