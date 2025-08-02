const express = require("express");
const path = require("path");
const rootDir = require("../utils/path");
const router = express.Router();
const { products } = require("./admin");

router.get("/", (req, res, next) => {
  res.render("shop", {
    pageTitle: "Shop Products",
    products,
    path: "/",
    hasProducts: !!products.length,
    activeShop: true,
    productCSS: true,
  });
});

module.exports = router;
