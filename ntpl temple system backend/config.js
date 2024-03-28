const mongoose = require('mongoose');

const url = process.env.BACKEND_MONGODB_URL;
// const DB_OPTIONS = {
//   dbName: process.env.DBNAME,
//   user: process.env.DBUSERNAME,
//   pass: process.env.DBPASSWORD,
//   authSource: process.env.DBAUTHSOURCE
// }

 
// mongoose.connect("mongodb://127.0.0.1:27017",DB_OPTIONS) 
// "mongodb://localhost:27017/ntpl_temple_project"
mongoose
  .connect(url)
.then(() => {
  console.log("database connection established");
})
.catch((err) => {
  console.log(err.message);
});