const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const Constants = require('./Constants');
const morgan = require('morgan');
const signRouter = require('./Router/SignRouter');
const logRouter = require('./Router/LoginRouter');
const cartRouter = require('./Router/CartRouter');
const homeRouter = require("./Router/HomeRouter");
const paymentRouter = require("./Router/PaymentRouter");


mongoose.connect(Constants.LOCAL_URL);


app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.use("/user/sign", signRouter);
app.use("/user/login", logRouter);
app.use("/user/cart", cartRouter);
app.use("/user/home", homeRouter);
app.use("/user/cart/payment", paymentRouter);



app.listen(3000, () => {
    console.log("Listening on server 3000");
})
