const express = require("express");
const aboutUsController = require("../controllers/aboutUs");
const router = express.Router();

router.get("/about-us", aboutUsController.getAboutUsPage);

module.exports = router;
