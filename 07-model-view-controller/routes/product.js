const express = require("express");
const productsController = require("../controllers/shop");
const router = express.Router();

router.get("/product/:id", productsController.getProduct);

module.exports = router;
