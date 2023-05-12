const express = require('express');
const cartRouter = express.Router();
const mongoose = require('mongoose');
const CartSchema = require('../Schema/CartSchema')
const ProductSchema = require('../Schema/ProductSchema');
const Cart = mongoose.model('cart', CartSchema, 'cart');
const Product = mongoose.model('products', ProductSchema, 'products');
const AppUtils = require('../AppUtils');
const Constants = require('../Constants');


cartRouter.post('/add', async (req, res) => {
    const productName = req.body.productName;
    if (!productName) {
        res.status(400).json(AppUtils.generateMissingFieldError(Constants.ID));
        return;
    }
    try {
        let count = 1;
        const product = await Product.findOne({ productName: productName });
        if (product) {
            if (product.quantity > 0) {
                const availCart = await Cart.findOne({ productName: product.productName });
                product.quantity = product.quantity - 1;
                if (availCart) {
                    const cartData = await Cart.findOneAndUpdate({ productName: availCart.productName }, {

                        quantity: ++count
                    })
                    console.log(cartData.quantity);
                    await cartData.save();
                }
                else {
                    const cartData = new Cart({
                        productName: product.productName,
                        desc: product.desc,
                        price: product.price,
                        rating: product.rating,
                        quantity: 1
                    })
                    const cartItem = new Cart(cartData);
                    await cartItem.save();
                }
                await product.save();
                res.status(201).json(AppUtils.generateSuccess("ITEM ADDED SUCCESSFULLY", "Item added successfully"));
            }
            else {
                res.status(200).json(AppUtils.generateSuccess("OUT OF STOCK", "Item is not in stock"));
            }
        }
    } catch (err) {
        res.status(500).json(AppUtils.generateError(err.code, err.message));
    }
});

cartRouter.get('/', async (req, res) => {
    try {
        const cartData = await Cart.find({});
        if (cartData != null) {
            res.status(200).json({
                cartData: cartData
            });

        }
        else {
            res.status(200).json(AppUtils.generateSuccess("CART EMPTY", "Cart is empty"));
        }
    } catch (err) {
        res.status(500).json(AppUtils.generateError(err.code, err.message));
    }
})



cartRouter.delete('/delete', async (req, res) => {
    const productName = req.body.productName;
    try {
        const cartItem = await Cart.findOne({ productName: productName });
        const productItem = await Product.findOne({ productName: productName });
        if (cartItem) {
            if (cartItem.quantity === 1) {
                await Cart.findOneAndDelete({ productName: productName });
                res.json(AppUtils.generateSuccess("REMOVE FROM CART", "Remove from cart"));
            }
            else {
                cartItem.quantity = cartItem.quantity - 1;
                productItem.quantity = productItem.quantity - 1;
                await cartItem.save();
                await productItem.save();
            }
        }
    } catch (err) {
        res.status(500).json(AppUtils.generateError(err.code, err.message));
    }
})




module.exports = cartRouter;