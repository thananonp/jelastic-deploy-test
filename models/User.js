const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRound = 12;

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    full_name: {type: String, required: true},
}, {collection: 'users'});

userSchema.pre('save', async function (next) {
    // only hash the password if it has been modified (or is new)
    try {
        if (!this.isModified('password')) return next();
        const salt = await bcrypt.genSalt(saltRound);
        const hash = await bcrypt.hash(this.password, salt);
        this.password = hash;
        next();
    } catch (err) {
        next(err);
    }
});

module.exports = mongoose.model('User', userSchema);
