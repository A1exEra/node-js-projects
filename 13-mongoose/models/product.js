const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const productSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("Product", productSchema);

// const mongodb = require('mongodb');
// const getDb = require('../util/database').getDb;

// class Product {
//   constructor(title, price, description, imageUrl, id, userId) {
//     this.title = title;
//     this.price = price;
//     this.description = description;
//     this.imageUrl = imageUrl;
//     this._id = id ? new mongodb.ObjectId(id) : null;
//     this.userId = userId;
//   }

//   save() {
//     const db = getDb();
//     let dbOp;
//     if (this._id) {
//       // Update the product
//       dbOp = db
//         .collection('products')
//         .updateOne({ _id: this._id }, { $set: this });
//     } else {
//       dbOp = db.collection('products').insertOne(this);
//     }
//     return dbOp
//       .then(result => {
//         console.log(result);
//       })
//       .catch(err => {
//         console.log(err);
//       });
//   }

//   static fetchAll() {
//     const db = getDb();
//     return db
//       .collection('products')
//       .find()
//       .toArray()
//       .then(products => {
//         console.log(products);
//         return products;
//       })
//       .catch(err => {
//         console.log(err);
//       });
//   }

//   static findById(prodId) {
//     const db = getDb();
//     return db
//       .collection('products')
//       .find({ _id: new mongodb.ObjectId(prodId) })
//       .next()
//       .then(product => {
//         console.log(product);
//         return product;
//       })
//       .catch(err => {
//         console.log(err);
//       });
//   }

//   static deleteById(prodId) {
//     const db = getDb();
//     return db
//       .collection('products')
//       .deleteOne({ _id: new mongodb.ObjectId(prodId) })
//       .then(result => {
//         console.log('Deleted');
//       })
//       .catch(err => {
//         console.log(err);
//       });
//   }
// }

// module.exports = Product;
// const { v4: uuid } = require("uuid");
// const fs = require("fs").promises;
// const path = require("path");
// const rootDir = require("../utils/path");
// const p = path.join(rootDir, "data", "products.json");

// const getProductsFromFile = async () => {
//   try {
//     const fileContent = await fs.readFile(p, "utf8");
//     return JSON.parse(fileContent);
//   } catch (err) {
//     console.log(err);
//     return [];
//   }
// };

// module.exports = class Product {
//   constructor(id, title, imageUrl, price, description) {
//     this.id = id;
//     this.title = title;
//     this.imageUrl = imageUrl;
//     this.price = price;
//     this.description = description;
//   }

//   async save() {
//     const newProduct = {
//       ...this,
//       id: uuid(),
//     };
//     try {
//       const products = await getProductsFromFile();
//       if (this.id) {
//         const existingProductIndex = products.findIndex(
//           (product) => this.id === product.id,
//         );
//         const updatedProducts = [...products];
//         updatedProducts[existingProductIndex] = this;
//         await fs.writeFile(p, JSON.stringify(updatedProducts, null, 2));
//       } else {
//         products.push(newProduct);
//         await fs.writeFile(p, JSON.stringify(products, null, 2));
//       }
//     } catch (err) {
//       console.log(err);
//     }
//   }

//   static async findById(id) {
//     try {
//       const products = await getProductsFromFile();
//       const product = products.find((product) => id === product.id);
//       if (product) {
//         return product;
//       } else {
//         return null;
//       }
//     } catch (err) {
//       console.log("Error getting product:", err);
//       return null;
//     }
//   }

//   static async fetchAll() {
//     try {
//       return await getProductsFromFile();
//     } catch (err) {
//       console.log("Error fetching products:", err);
//       return [];
//     }
//   }

//   static async deleteById(id) {
//     try {
//       const products = await this.fetchAll();
//       const initialLength = products.length;
//       const filteredProducts = products.filter((product) => product.id !== id);

//       if (filteredProducts.length === initialLength) {
//         return { success: false, message: "Product not found" };
//       }

//       await fs.writeFile(p, JSON.stringify(filteredProducts, null, 2));
//       return { success: true, message: "Product deleted successfully" };
//     } catch (err) {
//       console.log(err);
//       return { success: false, message: "Error deleting product" };
//     }
//   }
// };
