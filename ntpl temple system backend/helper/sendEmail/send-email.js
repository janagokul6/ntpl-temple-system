require("dotenv").config();
var nodemailer = require("nodemailer");

var transporter = nodemailer.createTransport({
  service: "gmail",
  port: 465,
  secure: true,
  logger: true,
  debug: true,
  secureConnection: false,
  auth: {
    user: process.env.EMAIL_TO_FROM_EMAIL,
    pass: process.env.EMAIL_TO_FROM_PASSWORD,
  },
  tls: {
    rejectUnauthorized: true,
  },
});

const sendEmail = async (
  email,
  from,
  subject,
  body,
  callBackSuccess,
  callbackError
) => {
  var mailOptions = {
    from: `${from} <substoremailer@gmail.com>`,
    to: email,
    subject: subject,
    text: body,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      callbackError(error);
    } else {
      callBackSuccess(info);
    }
  });
};

module.exports = sendEmail;
