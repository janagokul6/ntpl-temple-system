require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const port = process.env.PORT || 8000;
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");
const fileupload = require("express-fileupload");

const app = express();
const loginRoutes = require("./routes/auth/routes");
const adminRoutes = require("./routes/admin/routes");
const guestRoutes = require("./routes/api/guestRoutes");
const customerRoutes = require("./routes/api/customerRoutes");
//-----------------------------------------mongoose connection end
const config = require("./config");
const { authenticateToken } = require("./middleware/admin.middleware");
const {
  authenticateTokenCustomer,
} = require("./middleware/customer.middleware");

//-----------------------------------------mongoose connection end

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
// router middleware
app.use(fileupload());
app.use(cors());
app.use(express.static(path.join(__dirname, "assets")));
app.use("/auth", loginRoutes);
app.use("/auth/*", loginRoutes);
app.use("/guest", guestRoutes);
app.use("/guest/*", guestRoutes);
app.use("/admin", authenticateToken, adminRoutes);
app.use("/admin/*", authenticateToken, adminRoutes);
app.use("/customer", authenticateTokenCustomer, customerRoutes);
app.use("/customer/*", authenticateTokenCustomer, customerRoutes);

app.use("/", (req, res) => {
  res.send("very good home page");
});
app.listen(port, () => {
  console.log(`you server is started at http://localhost:${port}`);
});
