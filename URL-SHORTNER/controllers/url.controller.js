const shortid = require("shortid");
const URL = require("../models/url");

exports.handleGenerateNewShortURL = async (req, res) => {
  const body = req.body;
  if (!body.url) {
    return res.status(400).json({
      error: "Please provide a URL to shorten",
    });
  }
  const shortID = shortid.generate();
  console.log(shortID);
  await URL.create({
    shortID: shortID,
    redirectedURL: body.url, // Corrected to match the schema
    visitHistory: [],
  });
  return res.json({
    id: shortID,
  });
};

exports.handleGetAnalytics = async () => {
  const shortID = req.params.shortID;
  const result = await URL.findOne({ shortID });
  return res.json({
    totalClicks: result.visitHistory.length,
    analytics: result.visitHistory,
  });
};
