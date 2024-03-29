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
try {
  let existingDetails = await WebSiteDetailsModel.findOne();

  if (existingDetails) {
    // Update existing details
    if (tmc !== undefined) {
      existingDetails.tmc.push(tmc);
    }
    if (about !== undefined) {
      existingDetails.about = about;
    }
    if (cancelationPolicy !== undefined) {
      existingDetails.cancelationPolicy.push(cancelationPolicy);
    }
    if (basicDetails !== undefined) {
      existingDetails.basicDetails = basicDetails;
    }
    await existingDetails.save();
    return res.status(200).json({ message: "Details updated" });
  } else {
    // Create new details if not found
    const newDetails = new WebSiteDetailsModel({
      tmc: tmc !== undefined ? [tmc] : [],
      about: about !== undefined ? about : '',
      cancelationPolicy: cancelationPolicy !== undefined ? [cancelationPolicy] : [],
      basicDetails: basicDetails !== undefined ? basicDetails : '',
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
