const Product = require("../models/product");
// const Cart = require("../models/cart");
const Order = require("../models/order");

exports.getProducts = (req, res, next) => {
  Product.find()
    .then((products) => {
      console.log(products);
      res.render("shop/product-list", {
        products,
        pageTitle: "All Products",
        path: "/products",
        isAuthenticated: req.isLoggedIn,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findById(prodId)
    .then((product) => {
      res.render("shop/product-detail", {
        product,
        pageTitle: product.title,
        path: "/products",
        isAuthenticated: req.isLoggedIn,
      });
    })
    .catch((err) => console.log(err));
};

exports.getIndex = (req, res, next) => {
  Product.find()
    .then((products) => {
      res.render("shop/index", {
        products,
        pageTitle: "Shop",
        path: "/",
        isAuthenticated: req.isLoggedIn,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getCart = (req, res, next) => {
  if (!req.user) {
    console.log("No user found in request");
    return res.redirect("/");
  }

  req.user
    .populate("cart.items.productId")
    .then((user) => {
      const products = user.cart.items;
      res.render("shop/cart", {
        path: "/cart",
        pageTitle: "Your Cart",
        products,
        isAuthenticated: req.isLoggedIn || false,
      });
    })
    .catch((err) => {
      console.log("Error in getCart:", err);
      res.render("shop/cart", {
        path: "/cart",
        pageTitle: "Your Cart",
        products: [],
        isAuthenticated: req.isLoggedIn || false,
      });
    });
};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId)
    .then((product) => {
      return req.user.addToCart(product);
    })
    .then((result) => {
      console.log(result);
      res.redirect("/cart");
    });
};

exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  req.user
    .removeFromCart(prodId)
    .then((result) => {
      res.redirect("/cart");
    })
    .catch((err) => console.log(err));
};

exports.postOrder = (req, res, next) => {
  req.user
    .populate("cart.items.productId")
    .then((user) => {
      const products = user.cart.items.map((i) => {
        return { quantity: i.quantity, product: { ...i.productId._doc } };
      });
      const order = new Order({
        user: {
          name: req.user.name,
          userId: req.user,
        },
        products: products,
      });
      return order.save();
    })
    .then((result) => {
      return req.user.clearCart();
    })
    .then(() => {
      res.redirect("/orders");
    })
    .catch((err) => console.log(err));
};

exports.getOrders = (req, res, next) => {
  Order.find({ "user.userId": req.user._id })
    .then((orders) => {
      res.render("shop/orders", {
        path: "/orders",
        pageTitle: "Your Orders",
        orders: orders,
        isAuthenticated: req.isLoggedIn,
      });
    })
    .catch((err) => console.log(err));
};

// exports.getIndex = async (req, res, next) => {
//   try {
//     const products = await Product.fetchAll();
//     res.render("shop/index", {
//       pageTitle: "Shop",
//       products,
//       path: "/",
//       hasProducts: !!products.length,
//       activeShop: true,
//       productCSS: true,
//     });
//   } catch (err) {
//     console.error("Error fetching products:", err);
//   }
// };
// exports.getCart = async (req, res, next) => {
//   try {
//     const { products, totalPrice } = await Cart.getProducts();
//     res.render("shop/cart", {
//       pageTitle: "Your Cart",
//       path: "/cart",
//       products,
//       totalPrice,
//     });
//   } catch (err) {
//     console.log(err);
//   }
// };
// exports.getCheckout = (req, res, next) => {
//   res.render("shop/checkout", { pageTitle: "Checkout", path: "/checkout" });
// };
// exports.getOrders = (req, res, next) => {
//   res.render("shop/orders", { pageTitle: "Orders", path: "/orders" });
// };

// exports.getProduct = async (req, res, next) => {
//   try {
//     const productId = req.params.productId;
//     const product = await Product.findById(productId);
//     if (product) {
//       res.render(`shop/product-detail`, {
//         pageTitle: product.title,
//         product,
//         path: `/products`,
//       });
//     } else {
//       res
//         .status(404)
//         .render("404", { pageTitle: "Product Not Found", path: "/404" });
//     }
//   } catch (err) {}
// };

// exports.getProducts = async (req, res, next) => {
//   try {
//     const products = await Product.fetchAll();
//     res.render("shop/product-list", {
//       pageTitle: "Shop Products",
//       products,
//       path: "/products",
//       hasProducts: !!products.length,
//       activeShop: true,
//       productCSS: true,
//     });
//   } catch (err) {
//     console.error("Error fetching products:", err);
//   }
// };

// exports.postCart = async (req, res, next) => {
//   try {
//     const productId = req.body.productId;
//     console.log("Adding product to cart:", productId);

//     const product = await Product.findById(productId);
//     console.log("Product found:", product);

//     if (product && product.price) {
//       await Cart.addProduct(productId, product.price); // Added await here!
//       console.log("Product added to cart successfully");
//     } else {
//       console.log("Product not found or has no price");
//     }

//     res.redirect("/cart");
//   } catch (err) {
//     console.error("Error adding to cart:", err);
//     res.redirect("/cart");
//   }
// };

// exports.postCartDeleteProduct = async (req, res, next) => {
//   const id = req.body.productId;
//   try {
//     await Cart.deleteProduct(id);
//   } catch (err) {
//     console.log(err);
//   }
//   res.redirect("/cart");
// };
