const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 3000; // Providing a default port if PORT is not defined in the environment
const db = require("./config/db");
const urlRoute = require("./routes/url.route");
const URL = require("./models/url"); // Changed variable name to match the model

app.use(express.json());

// Connect to the database
db.connectDB();

// Routes
app.use("/api/v1", urlRoute);

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
