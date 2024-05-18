const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 3000; // Providing a default port if PORT is not defined in the environment
const db = require("./config/db");
const urlRoute = require("./routes/url.route");
const URL = require("./models/url"); // Changed variable name to match the model
const path = require("path");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to the database
db.connectDB();

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

// Routes
app.use("/api/v1", urlRoute);

app.get("/test", async (req, res) => {
  const allUrls = await URL.find({});
  return res.render("home", {
    urls: allUrls,
  });
});

// Redirect short URLs to original URLs
app.get("/:shortid", async (req, res) => {
  const shortid = req.params.shortid;
  try {
    const url = await URL.findOneAndUpdate(
      { shortID: shortid }, // Corrected to match the schema
      {
        $push: {
          visitHistory: {
            timestamp: Date.now(),
          },
        },
      }
    );

    if (!url) {
      return res.status(404).send("URL not found");
    }

    res.redirect(url.redirectedURL);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).send("Internal Server Error");
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
