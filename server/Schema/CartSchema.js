const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({
    productName: String,
    desc: String,
    price: Number,
    rating: String,
    quantity: Number
}, { timestamps: true });

module.exports = CartSchema;