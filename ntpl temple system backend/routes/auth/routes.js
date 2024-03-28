const router = require("express").Router();
// =======================================================================================
// admin section
const {
  handleAdminLogin,
  handleAdminPassword,
  handleAdminPasswordVerify,
  handleAdminPasswordUpdate,
  handleVerifyToken,
} = require("../../controller/auth/adminLogin");
const { authenticateToken } = require("../../middleware/admin.middleware");
// admin section
// =======================================================================================

// =======================================================================================
// customer Section
const {
  handleCustomerEmailOtpSend,
  handleCustomerCanLogin,
  handleCustomerCanSignUp,
  handleCustomerNewSignUp,
  handleCustomerLogin,
  handleCustomerVerifyToken,
} = require("../../controller/auth/customerAuth");

// =======================================================================================
// admin section
router.post("/verify-token", authenticateToken, handleVerifyToken);
router.post("/admin/login", handleAdminLogin);
router.post("/admin/forget-password", handleAdminPassword);
router.post("/admin/forget_password_verify", handleAdminPasswordVerify);
router.post(
  "/admin/forget-password-update",
  authenticateToken,
  handleAdminPasswordUpdate
);
// admin section
// =======================================================================================

// =======================================================================================
// customer Section
router.post("/customer/send-otp-email", handleCustomerEmailOtpSend);
router.post("/customer/can-login", handleCustomerCanLogin);
router.post("/customer/can-signup", handleCustomerCanSignUp);
router.post("/customer/signin-new-customer", handleCustomerNewSignUp);
router.post("/customer/login-customer", handleCustomerLogin);
router.post("/customer/verifyToken", handleCustomerVerifyToken);
// customer Section
// =======================================================================================

module.exports = router;
