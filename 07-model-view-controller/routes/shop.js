const express = require("express");
// const path = require("path");
// const rootDir = require("../utils/path");
const router = express.Router();
const productsController = require("../controllers/products");

router.get("/", productsController.getProducts);

module.exports = router;
