const express = require("express");
const router = express.Router();
const { handleGenerateNewShortURL } = require("../controllers/url.controller");

router.post("/url", handleGenerateNewShortURL);

module.exports = router;
