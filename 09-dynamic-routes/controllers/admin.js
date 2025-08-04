const Product = require("../models/product");

exports.getAddProduct = (req, res, next) => {
  res.render("admin/edit-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editing: false,
    product: {},
  });
};

exports.getEditProduct = async (req, res, next) => {
  try {
    const editMode = req.query.edit;
    const productId = req.params.productId;
    const product = await Product.findById(productId);

    res.render("admin/edit-product", {
      pageTitle: "Edit Product",
      path: "/admin/edit-product",
      editing: editMode,
      product: product,
    });
  } catch (err) {
    console.lor(err);
    res.redirect("/");
  }
};

exports.postEditProduct = async (req, res, next) => {
  const id = req.body.productId;
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  try {
    const product = new Product(id, title, imageUrl, price, description);
    product.save();
    res.redirect("/products");
  } catch (err) {
    console.log(err);
  }
};

exports.postAddProduct = async (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;

  try {
    const product = new Product(null, title, imageUrl, price, description);
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

exports.postDeleteProduct = async (req, res, next) => {
  const productId = req.body.productId;
  try {
    await Product.deleteById(productId);
  } catch (err) {
    console.error("Error deleting product:", err);
  }
  res.redirect("/admin/products");
};
