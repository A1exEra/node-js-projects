const products = require("../public/products");
const Product = require("../models/product");

exports.getAddProduct = (req, res, next) => {
  res.render("add-product", {
    pageTitle: "Add Product",
    products,
    path: "/admin/add-product",
    formCSS: true,
    productCSS: true,
    activeAddProduct: true,
  });
};

exports.postAddProduct = (req, res, next) => {
  const product = new Product(req.body.title);
  if (product.title) {
    product.save();
  } else {
    console.error("No product was found!");
  }

  res.redirect("/");
};

exports.getProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render("shop", {
      pageTitle: "Shop Products",
      products,
      path: "/",
      hasProducts: !!products.length,
      activeShop: true,
      productCSS: true,
    });
  });
};
