const express = require('express');
const paymentRouter = express.Router();
const mongoose = require('mongoose');
const PaymentSchema = require('../Schema/PaymentSchema');
const payment = mongoose.model('payment', PaymentSchema, 'payment');
const AppUtils = require('../AppUtils');
const Constants = require('../Constants');

paymentRouter.post('/', async (req, res) => {
    const request = req.body;

    if (AppUtils.checkError(request, Constants.PAYMENT_DATA)) {
        res.status(400).json(AppUtils.checkError(request, Constants.PAYMENT_DATA));
        return;
    }

    try {
        const newData = new payment(request);
        await newData.save();
        res.status(200).json(AppUtils.generateSuccess("PAYMENT ADDED", "Payment added successfully"));
        setTimeout(async () => {
            await payment.findOneAndDelete({ cardNo: request.cardNo });
            return;
        }, 4000);
    }
    catch (err) {
        res.status(500).json(AppUtils.generateError(err.code, err.message));
    }
});


module.exports = paymentRouter;