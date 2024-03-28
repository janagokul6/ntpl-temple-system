const mongoose = require("mongoose");

const categorySchema = mongoose.Schema({
  name: { type: String },
  status: { type: String },
});

const categoryModel = mongoose.model("categories", categorySchema);
module.exports = categoryModel;
