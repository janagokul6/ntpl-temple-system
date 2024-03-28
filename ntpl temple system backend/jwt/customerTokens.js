const jwt = require("jsonwebtoken");

const secretKey = process.env.TOKEN_SECRET_CUSTOMER;

// Function to generate a JWT token
function generateToken(user) {
  // JWT payload
  const payload = {
    id: user._id,
    username: user.email,
  };

  // Generate token with payload and secret key
  const token = jwt.sign(payload, secretKey, { expiresIn: "180000000000s" }); // Expires in 100 year

  return token;
}

function verifyToken(token) {
  try {
    const decoded = jwt.verify(token, secretKey);
    return decoded;
  } catch (err) {
    // Token is invalid
    return null;
  }
}

module.exports = { generateToken, verifyToken };
