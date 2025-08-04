const Product = require("../models/product");
const Cart = require("../models/cart");

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
exports.getCart = async (req, res, next) => {
  try {
    const { products, totalPrice } = await Cart.getProducts();
    res.render("shop/cart", {
      pageTitle: "Your Cart",
      path: "/cart",
      products,
      totalPrice,
    });
  } catch (err) {
    console.log(err);
  }
};
exports.getCheckout = (req, res, next) => {
  res.render("shop/checkout", { pageTitle: "Checkout", path: "/checkout" });
};
exports.getOrders = (req, res, next) => {
  res.render("shop/orders", { pageTitle: "Orders", path: "/orders" });
};

exports.getProduct = async (req, res, next) => {
  try {
    const productId = req.params.productId;
    const product = await Product.findById(productId);
    if (product) {
      res.render(`shop/product-detail`, {
        pageTitle: product.title,
        product,
        path: `/products`,
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

exports.postCart = async (req, res, next) => {
  try {
    const productId = req.body.productId;
    console.log("Adding product to cart:", productId);

    const product = await Product.findById(productId);
    console.log("Product found:", product);

    if (product && product.price) {
      await Cart.addProduct(productId, product.price); // Added await here!
      console.log("Product added to cart successfully");
    } else {
      console.log("Product not found or has no price");
    }

    res.redirect("/cart");
  } catch (err) {
    console.error("Error adding to cart:", err);
    res.redirect("/cart");
  }
};

exports.postCartDeleteProduct = async (req, res, next) => {
  const id = req.body.productId;
  try {
    await Cart.deleteProduct(id);
  } catch (err) {
    console.log(err);
  }
  res.redirect("/cart");
};
