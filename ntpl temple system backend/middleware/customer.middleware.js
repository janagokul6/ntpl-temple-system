require("dotenv").config();
const jwt = require("jsonwebtoken");

// access config var
let accessToken = process.env.TOKEN_SECRET_CUSTOMER;

function authenticateTokenCustomer(req, res, next) {
  try {
    const token = req.headers.authorization.split(" ")[1]; // Authorization: 'Bearer TOKEN'
    if (!token) {
      throw new Error("Authentication failed!");
    }
    const verified = jwt.verify(token, accessToken);
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).send("Invalid token !");
  }
}

module.exports = { authenticateTokenCustomer };