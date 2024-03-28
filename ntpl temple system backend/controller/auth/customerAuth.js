const sendEmail = require("../../helper/sendEmail/send-email");
const { generateToken, verifyToken } = require("../../jwt/customerTokens");
const customerModel = require("../../model/customer.model");

const handleCustomerEmailOtpSend = async (req, res) => {
  sendEmail(
    req.body.email,
    process.env.EMAIL_TO_FROM_EMAIL,
    "Pujanya !",
    `Your Otp is ${req.body.otp}.`,
    (value) => {
      return res.status(200).json({ message: "success" });
    },
    (err) => {
      return res.status(402).json({ message: "error" });
    }
  );
};

const handleCustomerCanLogin = async (req, res) => {
  let isExist = await customerModel.findOne({ email: req.body.email });
  if (isExist) {
    return res.status(200).json({ message: "success" });
  } else {
    return res.status(200).json({
      message: "error",
      details: "User did not exist, sign up and create a new account!",
    });
  }
};

const handleCustomerCanSignUp = async (req, res) => {
  let isExist = await customerModel.findOne({ email: req.body.email });
  if (!isExist) {
    return res.status(200).json({ message: "success" });
  } else {
    return res.status(200).json({
      message: "error",
      details: "User already exists! Please login again.",
    });
  }
};

const handleCustomerNewSignUp = async (req, res) => {
  try {
    const isCreated = await customerModel.create({ email: req.body.email });
    if (isCreated) {
      const generatedToken = generateToken(isCreated);
      return res
        .status(200)
        .json({ message: "success", token: generatedToken });
    } else {
      return res
        .status(404)
        .json({ message: "error", detail: "something went wrong!" });
    }
  } catch (error) {
    return res
      .status(404)
      .json({ message: "error", detail: "something went wrong!" });
  }
};

const handleCustomerLogin = async (req, res) => {
  const customerData = await customerModel.findOne({ email: req.body.email });
  if (customerData) {
    const generatedToken = generateToken(customerData);

    return res.status(200).json({ message: "success", token: generatedToken });
  } else {
    return res
      .status(200)
      .json({ message: "error", detail: "something went wrong!" });
  }
};

const handleCustomerVerifyToken = async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  const customerData = verifyToken(token);

  if (customerData) {
    const newCustomerData = await customerModel.findById(customerData.id);
    return res.status(200).json({ message: "success", data: newCustomerData });
  } else {
    return res.status(200).json({ message: "error", detail: "Invalid Token!" });
  }
};

module.exports = {
  handleCustomerEmailOtpSend,
  handleCustomerCanLogin,
  handleCustomerCanSignUp,
  handleCustomerNewSignUp,
  handleCustomerLogin,
  handleCustomerVerifyToken,
};
