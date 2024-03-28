const WebSiteDetailsModel = require("../../model/websiteDetails.model");

// ----------------------------------------------------------------

// ----------------------------------------------------------------

const get = async (req, res) => {
  try {
    const details = await WebSiteDetailsModel.find();
    res.status(200).json(details);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error });
  }
};

const add = async (req, res) => {
  const { tmc, about, cancelationPolicy, basicDetails } = req.body;
  console.log(req.body);
  try {
    const existingDetails = await WebSiteDetailsModel.findOne();

    if (existingDetails) {
      // update existing details
      existingDetails.tmc.push(tmc);
      existingDetails.about = about;
      existingDetails.cancelationPolicy.push(cancelationPolicy);
      existingDetails.basicDetails = basicDetails;
      await existingDetails.save();
      return res.status(200).json({ message: "Details updated" });
    } else {
      //  Create new details:
      const newDetails = new WebSiteDetailsModel({
        tmc: [tmc],
        about,
        cancelationPolicy: [cancelationPolicy], 
        basicDetails,
      });
      await newDetails.save();
      return res.status(201).json({ message: "Details created" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating or creating details" });
  }
};

module.exports = { get, add };
