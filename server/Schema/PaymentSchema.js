const mongoose = require('mongoose');

const PaymentSchema = new mongoose.Schema({
    userName: String,
    cardNo: { type: Number, unique: true },
    valid: String,
    cvv: Number
}, { timestamps: true });



module.exports = PaymentSchema;