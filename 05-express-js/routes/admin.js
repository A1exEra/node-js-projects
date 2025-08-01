const express = require("express");
const path = require("path");
const rootDir = require("../utils/path");

const router = express.Router();

router.get("/add-product", (erq, res, next) => {
  res.sendFile(path.join(rootDir, "views", "add-product.html"));
});

router.post("/product", (req, res, next) => {
  const data = req.body;
  console.log(data);
  res.redirect("/");
});

module.exports = router;
