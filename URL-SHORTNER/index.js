const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 4000;
const urlRoute = require("./routes/url.route");
const { connectToMongoDB } = require("./config/connectDB");
app.use(express.json());

//route
app.use("/api/url", urlRoute);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
