const express = require("express");
const path = require("path");
const rootDir = require("../utils/path");

const router = express.Router();

const products = [];

router.get("/add-product", (erq, res, next) => {
  res.render("add-product", {
    pageTitle: "Add Product",
    products,
    path: "/admin/add-product",
    formCSS: true,
    productCSS: true,
    activeAddProduct: true,
  });
});

router.post("/add-product", (req, res, next) => {
  const data = req.body;
  products.push({ title: req.body.title });
  res.redirect("/");
});

module.exports = { router, products };
