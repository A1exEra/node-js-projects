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
  constructor(title, imageUrl, price, description) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.price = price;
    this.description = description;
  }

  async save() {
    const newProduct = {
      title: this.title,
      imageUrl: this.imageUrl,
      price: this.price,
      description: this.description,
      id: uuid(),
    };
    try {
      const products = await getProductsFromFile();
      products.push(newProduct);
      await fs.writeFile(p, JSON.stringify(products, null, 2));
    } catch (err) {
      console.log(err);
    }
  }

  static async getProduct(id) {
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
};
