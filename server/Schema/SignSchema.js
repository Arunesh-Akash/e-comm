const mongoose = require('mongoose');

const signSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    mobile_no: Number,
    date_of_birth: String,
    password: String,
    token: String
}, { timestamps: true });

module.exports = signSchema;