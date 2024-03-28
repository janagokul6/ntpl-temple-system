const mongoose = require("mongoose");

const FAQsSchema = mongoose.Schema({
  question: { type: String },
  answer: { type: String },
}, { timestamp: true })

const FAQsModel = mongoose.model("FAQ", FAQsSchema);

module.exports = FAQsModel;
