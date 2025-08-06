const { v4: uuid } = require("uuid");
const Product = require("./product");
const fs = require("fs").promises;
const path = require("path");
const rootDir = require("../utils/path");
const p = path.join(rootDir, "data", "cart.json");

const getProductsFromFile = async () => {
  try {
    const fileContent = await fs.readFile(p, "utf8");

    // Check if file is empty
    if (!fileContent || fileContent.trim() === "") {
      console.log("Cart file is empty, returning default cart");
      return { products: [], totalPrice: 0 };
    }

    return JSON.parse(fileContent);
  } catch (err) {
    console.log("Error reading cart file:", err.message);
    // Return default cart structure on any error
    return { products: [], totalPrice: 0 };
  }
};

module.exports = class Cart {
  constructor() {
    this.products = [];
    this.totalPrice = 0;
  }

  static async addProduct(id, productPrice) {
    console.log("Adding product:", { id, productPrice });

    try {
      // Use the same getProductsFromFile function
      let cart = await getProductsFromFile();

      // Ensure totalPrice is a number
      cart.totalPrice = cart.totalPrice || 0;

      // Find existing product
      const existingProductIndex = cart.products.findIndex(
        (product) => id === product.id,
      );

      let updatedProduct;

      if (existingProductIndex >= 0) {
        // Update existing product
        updatedProduct = { ...cart.products[existingProductIndex] };
        updatedProduct.qty = cart.products[existingProductIndex].qty + 1;
        cart.products[existingProductIndex] = updatedProduct;
      } else {
        // Add new product
        updatedProduct = { id: id, qty: 1, price: productPrice };
        cart.products.push(updatedProduct);
      }

      // Update total price
      const priceToAdd = parseFloat(productPrice) || 0;
      cart.totalPrice = cart.totalPrice + priceToAdd;

      console.log("Updated cart:", cart);

      // Write back to file using promises
      await fs.writeFile(p, JSON.stringify(cart, null, 2));
      console.log("Cart saved successfully");
    } catch (err) {
      console.error("Error in addProduct:", err);
    }
  }

  static async getProducts() {
    try {
      const cartProducts = await getProductsFromFile();
      const fetchedProducts = await Product.fetchAll();
      const filteredProducts = {
        products: [],
        totalPrice: cartProducts.totalPrice,
      };

      fetchedProducts.forEach((product) => {
        cartProducts.products.forEach((cartProduct) => {
          if (product.id === cartProduct.id) {
            filteredProducts.products.push({
              ...product,
              qty: cartProduct.qty,
            });
          }
        });
      });
      return filteredProducts;
    } catch (err) {
      console.log(err);
      return { products: [], totalPrice: 0 }; // Return default structure on error
    }
  }

  static async deleteProduct(id) {
    try {
      const cart = await getProductsFromFile();

      if (!cart) {
        console.log("No cart was found!");
        return false;
      }

      const productIndex = cart.products.findIndex(
        (product) => product.id === id,
      );

      if (productIndex !== -1) {
        const product = cart.products[productIndex];

        if (product.qty > 1) {
          // Decrease quantity and update total price
          product.qty -= 1;
          cart.totalPrice -= product.price;
        } else if (product.qty === 1) {
          // Remove product completely and update total price
          cart.totalPrice -= product.price;
          cart.products = cart.products.filter((p) => p.id !== id);
        }

        await fs.writeFile(p, JSON.stringify(cart, null, 2));
        return true;
      } else {
        console.log("No product was found!");
        return false;
      }
    } catch (err) {
      console.log(err);
      return false;
    }
  }
};
