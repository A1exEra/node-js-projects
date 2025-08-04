const { v4: uuid } = require("uuid");
const fs = require("fs").promises;
const path = require("path");
const rootDir = require("../utils/path");
const p = path.join(rootDir, "data", "products.json");

const getProductsFromFile = async () => {
  try {
    const fileContent = await fs.readFile(p, "utf8");
    return JSON.parse(fileContent);
  } catch (err) {
    console.log(err);
    return [];
  }
};

module.exports = class Product {
  constructor(id, title, imageUrl, price, description) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.price = price;
    this.description = description;
  }

  async save() {
    const newProduct = {
      ...this,
      id: uuid(),
    };
    try {
      const products = await getProductsFromFile();
      if (this.id) {
        const existingProductIndex = products.findIndex(
          (product) => this.id === product.id,
        );
        const updatedProducts = [...products];
        updatedProducts[existingProductIndex] = this;
        await fs.writeFile(p, JSON.stringify(updatedProducts, null, 2));
      } else {
        products.push(newProduct);
        await fs.writeFile(p, JSON.stringify(products, null, 2));
      }
    } catch (err) {
      console.log(err);
    }
  }

  static async findById(id) {
    try {
      const products = await getProductsFromFile();
      const product = products.find((product) => id === product.id);
      if (product) {
        return product;
      } else {
        return null;
      }
    } catch (err) {
      console.log("Error getting product:", err);
      return null;
    }
  }

  static async fetchAll() {
    try {
      return await getProductsFromFile();
    } catch (err) {
      console.log("Error fetching products:", err);
      return [];
    }
  }

  static async deleteById(id) {
    try {
      const products = await this.fetchAll();
      const initialLength = products.length;
      const filteredProducts = products.filter((product) => product.id !== id);

      if (filteredProducts.length === initialLength) {
        return { success: false, message: "Product not found" };
      }

      await fs.writeFile(p, JSON.stringify(filteredProducts, null, 2));
      return { success: true, message: "Product deleted successfully" };
    } catch (err) {
      console.log(err);
      return { success: false, message: "Error deleting product" };
    }
  }
};
