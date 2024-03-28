const mongoose = require("mongoose");

const customerSchema = mongoose.Schema({
  image: { type: String },
  name: { type: String },
  email: { type: String },
  mobile: { type: Number },
  addressArray: { type: Array },
  wishlists: { type: Array },
  cart: { type: Array },
});

const customerModel = mongoose.model("customers", customerSchema);

module.exports = customerModel;
