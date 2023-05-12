const express = require('express');
const homeRouter = express.Router();
const mongoose = require('mongoose');
const ProductSchema = require('../Schema/ProductSchema');
const home = mongoose.model('products', ProductSchema, 'products');
const AppUtils = require('../AppUtils');
const Constants = require('../Constants');

homeRouter.post('/add', async (req, res) => {
    const request = req.body;

    if (AppUtils.checkError(request, Constants.PRODUCT_DATA)) {
        res.status(400).json(AppUtils.checkError(request, Constants.PRODUCT_DATA));
        return;
    }
    try {
        const newProduct = new home(request);
        await newProduct.save();
        res.status(201).json(AppUtils.generateSuccess("PRODUCT ADDED", "Product added successfully"));
    } catch (err) {
        res.status(500).json(AppUtils.generateError(err.code, err.message));
    }
});


homeRouter.get('/', async (req, res) => {
    try {
        const allProduct = await home.find();
        if (allProduct) {
            res.status(200).json({
                allProduct: allProduct
            });
        }
        else {
            res.status(404).json(AppUtils.generateError("PRODUCT EMPTY", "Product empty"));
        }
    } catch (err) {
        res.status(500).json(AppUtils.generateError(err.code, err.message));
    }
});


homeRouter.put('/update', async (req, res) => {
    const request = req.body;

    if (AppUtils.checkError(request, Constants.PRODUCT_DATA)) {
        res.status(400).json(AppUtils.checkError(request, Constants.PRODUCT_DATA));
        return;
    }

    try {
        const data = await home.findOneAndUpdate(
            { _id: request._id },
            {
                productName: request.productName,
                price: request.price,
                desc: request.desc,
                rating: request.rating,
                quantity: request.quantity
            });
        await data.save();
        res.status(200).json(AppUtils.generateSuccess("UPDATED SUCCESSFULLY", "Updated successfully"));
    } catch (err) {
        res.status(500).json(AppUtils.generateError(err.code, err.message));
    }
});


homeRouter.delete('/delete', async (req, res) => {
    const product_id = req.query._id;

    if (!product_id) {
        res.status(400).json(AppUtils.generateMissingFieldError(Constants.ID));
        return;
    }
    try {
        await home.findOneAndDelete({ _id: product_id });
        res.status(200).json(AppUtils.generateSuccess("DELETED SUCCESSFULLY", "Deleted successfully"));
    } catch (err) {
        res.status(500).json(AppUtils.generateError(err.code, err.message));
    }
})

module.exports = homeRouter;