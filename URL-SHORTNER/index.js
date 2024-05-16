const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT;
const db = require("./config/db");
const urlRoute = require("./routes/url.route");

app.use(express.json());
// db connection

db.connectDB();
// routes
app.use("/api/v1", urlRoute);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
