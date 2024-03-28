const API_KEY =
  "9KGo5eZEx7Ph3QCUdSLAWsmYblRN1DJpgni62IHFOcBvaqfTMwQFI6w2vSU8WaCYij3ukBhyT9lK7Ap1";
const OTP_URL = "https://www.fast2sms.com/dev/bulkV2";

const SendOtp = async (mobileNumber, otp) => {
  const payload = {
    variables_values: `${otp}`,
    route: "otp",
    numbers: `${mobileNumber}`,
  };

  try {
    const response = await fetch(OTP_URL, {
      method: "POST",
      headers: {
        authorization: API_KEY,
      },
      body: new URLSearchParams(payload),
    });

    const data = await response.json();
    console.log(data);

    if (data.return === true) {
      console.log("OTP sent successfully");
      return "success";
    } else {
      console.error("Failed to send OTP");
      return "error";
    }
  } catch (error) {
    console.error("Error:", error);
    return "error";
  }
};

module.exports = SendOtp;
