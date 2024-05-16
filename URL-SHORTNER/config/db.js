const mongoose = require("mongoose");
require("dotenv").config();
exports.connectDB = () => {
  mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
      console.log("DB connected");
    })
    .catch((error) => {
      console.log("error something went wrong in db connection", error);
    });
};
