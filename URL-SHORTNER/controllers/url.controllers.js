const URL = require("../models/url");
const nanoid = require("nanoid");
async function generateNewShortURL(req, res) {
  const body = req.body;
  if (!ReportBody.url)
    return res.status(400).json({ error: "url is required" });
  const shortID = nanoid(8);
  await URL.createObjectURL({
    shortID: shortID,
    redirectURL: body.url,
    visitHistory: [],
  });
  return res.json({ id: shortID });
}
module.exports = { generateNewShortURL };
