const express = require('express');
const logRouter = express.Router();
const mongoose = require('mongoose');
const SignSchema = require('../Schema/SignSchema')
const sign = mongoose.model('users', SignSchema, 'users');
const bcrypt = require('bcrypt');
const AppUtils = require('../AppUtils');
const Constants = require('../Constants');


logRouter.post('/', async (req, res) => {
    const request = {
        email: req.body[Constants.LOG_REQUEST.EMAIL].toLowerCase(),
        password: req.body[Constants.LOG_REQUEST.PASSWORD]
    };

    if (AppUtils.checkError(request, Constants.LOG_REQUEST)) {
        res.status(400).json(AppUtils.checkError(request, Constants.LOG_REQUEST));
        return;
    }
    try {
        const user = await sign.findOne({ email: request.email });
        if (user) {
            let passwordMatch = await bcrypt.compare(request.password, user.password);
            if (passwordMatch) {
                const successResponse = AppUtils.generateSuccess(
                    "AUTHORISED",
                    "Successfully Logged In"
                );
                successResponse.user = {
                    email: user.email,
                    name: user.name,
                    date_of_birth: user.date_of_birth,
                    createdAt: user.createdAt,
                    updatedAt: user.updatedAt,
                };
                successResponse.token = jwt.sign(
                    { email: user.email },
                    Constants.SECRET_KEY
                );
                data.token = successResponse.token;
                data.save();
                res.json(successResponse);
                return;
            } else {
                res
                    .status(401)
                    .json(AppUtils.generateError("UNAUTHORIZED", "Invalid Credentials"));
                return;
            }

        }
        else {
            res.status(404).json(AppUtils.generateError("USER NOT FOUND", "User not found"));
        }
    } catch (err) {
        res.status(500).json(AppUtils.generateError(err.code, err.message));
    }
})

module.exports = logRouter;


