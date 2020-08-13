const mongoose = require('mongoose');

let authSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 6,
        max:255
    },
    username: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    password: {
        type: String,
        required: true,
        min: 6,
        max: 255
    }
})

moduel.exports = mongoose.model('Auth', authSchema);  