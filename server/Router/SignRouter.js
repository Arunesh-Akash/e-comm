const express = require('express');
const signRouter = express.Router();
const signSchema = require('../Schema/SignSchema');
const mongoose = require('mongoose');
const sign = mongoose.model('users', signSchema, 'users');
const bcrypt = require('bcrypt');
const AppUtils = require('../AppUtils');
const Constants = require('../Constants');
const jwt = require('jsonwebtoken');

signRouter.post('/', async (req, res) => {
    const request = req.body;

    if (AppUtils.checkError(request, Constants.SIGNUP_REQUEST)) {
        res.status(400).json(AppUtils.checkError(request, Constants.SIGNUP_REQUEST));
        return;
    }
    try {
        request.password = await AppUtils.encryptPassword(request.password);
        request.email = request.email.toLowerCase();
        request.token = jwt.sign({ email: request.email }, Constants.SECRET_KEY);
        const user = new sign(request);
        await user.save();
        res.status(201).json(AppUtils.generateSuccess("USER CREATED", "User created successfully"));
    } catch (err) {
        if (err.code == "11000")
            res
                .status(400)
                .json(
                    AppUtils.generateError("USER_ALREADY_EXISTS", "User Already Exists")
                );
        else res.status(500).json(AppUtils.generateError(err.code, err.message));
    }
})












module.exports = signRouter;