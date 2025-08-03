const Product = require("../models/product");

exports.getAddProduct = (req, res, next) => {
  res.render("admin/add-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    formCSS: true,
    productCSS: true,
    activeAddProduct: true,
  });
};

exports.postAddProduct = async (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  try {
    const product = new Product(title, imageUrl, price, description);
    if (product.title) {
      await product.save();
    } else {
      console.error("No product was found!");
    }
  } catch (err) {
    console.error("Error saving product:", err);
  }
  res.redirect("/");
};

exports.getProducts = async (req, res, next) => {
  try {
    const products = await Product.fetchAll();
    if (products) {
      res.render("admin/products", {
        products,
        pageTitle: "Admin Products",
        path: "/admin/producs",
      });
    }
  } catch (err) {
    console.log(err);
  }
};
