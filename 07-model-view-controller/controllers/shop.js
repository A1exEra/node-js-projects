const Product = require("../models/product");

exports.getIndex = async (req, res, next) => {
  try {
    const products = await Product.fetchAll();
    res.render("shop/index", {
      pageTitle: "Shop",
      products,
      path: "/",
      hasProducts: !!products.length,
      activeShop: true,
      productCSS: true,
    });
  } catch (err) {
    console.error("Error fetching products:", err);
  }
};
exports.getCart = (req, res, next) => {
  res.render("shop/cart", { pageTitle: "Your Cart", path: "/cart" });
};
exports.getCheckout = (req, res, next) => {
  res.render("shop/checkout", { pageTitle: "Checkout", path: "/checkout" });
};
exports.getOrders = (req, res, next) => {
  res.render("shop/orders", { pageTitle: "Orders", path: "/orders" });
};

exports.getProduct = async (req, res, next) => {
  try {
    const productId = req.params.id;
    const product = await Product.getProduct(productId);
    if (product) {
      res.render("shop/product-detail", {
        pageTitle: product.title,
        product,
        path: "/product",
      });
    } else {
      res
        .status(404)
        .render("404", { pageTitle: "Product Not Found", path: "/404" });
    }
  } catch (err) {}
};

exports.getProducts = async (req, res, next) => {
  try {
    const products = await Product.fetchAll();
    res.render("shop/product-list", {
      pageTitle: "Shop Products",
      products,
      path: "/products",
      hasProducts: !!products.length,
      activeShop: true,
      productCSS: true,
    });
  } catch (err) {
    console.error("Error fetching products:", err);
  }
};
