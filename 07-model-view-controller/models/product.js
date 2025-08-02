const { v4: uuid } = require("uuid");
const fs = require("fs");
const path = require("path");
const rootDir = require("../utils/path");
const products = require("../data/products");
const p = path.join(rootDir, "data", "products.json");

const getProductsFromFile = (callBack) => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      return callBack([]);
    }
    callBack(JSON.parse(fileContent));
  });
};

module.exports = class Product {
  constructor(title) {
    this.title = title;
  }
  save() {
    const newProduct = { title: this.title, id: uuid() };
    getProductsFromFile((products) => {
      products.push(newProduct);
      fs.writeFile(p, JSON.stringify(products), (err) => {
        if (err) {
          console.log(err);
        }
      });
    });
  }

  static fetchAll(callBack) {
    getProductsFromFile(callBack);
  }
};
