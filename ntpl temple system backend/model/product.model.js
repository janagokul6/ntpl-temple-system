const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  name: { type: String },
  image: { type: String },
  image2: { type: String },
  image3: { type: String },
  image4: { type: String },
  image5: { type: String },
  description: { type: String },
  mrp: { type: Number },
  price: { type: Number },
  category: { type: String },
  status: { type: String },
});

const productModel = mongoose.model("products", productSchema);

module.exports = productModel;
