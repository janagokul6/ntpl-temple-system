const mongoose = require("mongoose");

const websiteDetailsSchema = mongoose.Schema({

  tmc: [{
    title: { type: String },
    description: { type: String }
  }],
  about: {
    title: { type: String },
    description: { type: String },
    image: { type: String } 
  },
  cancelationPolicy: [{
    title: { type: String },
    description: { type: String }
  }],
  basicDetails: {
    iosLink: { type: String },
    androidLink: { type: String },
    logo: { type: String }, 
    number: { type: String },
    address: { type: String },
    email: { type: String }
  }
})

const WebSiteDetailsModel = mongoose.model("WebSiteDetails", websiteDetailsSchema);

module.exports = WebSiteDetailsModel;
