const { mongoose } = require("mongoose");
const jwt = require("jsonwebtoken");
const SignSchema = require("../Schema/SignSchema");
const User = mongoose.model("user", SignSchema, "user");
const express = require("express");
const Constants = require("../Constants");

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null)
    return res.status(401).json({
      error: "Unauthorized",
      messsage: "Token Expired, Login Again to Continue",
    });

  jwt.verify(token, Constants.SECRET_KEY, async (err, decodedToken) => {
    console.log("Token Extracted");
    console.log(decodedToken);
    if (err)
      return res.status(401).json({
        error: "Unauthorized",
        messsage: "Token Expired, Login Again to Continue",
      });

    try {
      const user = await User.findOne({ email: decodedToken.email });
      if (!user)
        return res.status(401).json({
          error: "Unauthorized",
          messsage: "Token Expired, Login Again to Continue",
        });
      if (user.token == token) next();
      else
        return res.status(401).json({
          error: "Unauthorized",
          messsage: "Token Expired, Login Again to Continue",
        });
    } catch (err) {
      return res.status(500).json({ error: "Server Error" });
    }
  });
}

module.exports = authenticateToken;
