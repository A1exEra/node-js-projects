const express = require("express");
const path = require("path");
const rootDir = require("./utils/path");
const bodyParser = require("body-parser");
const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const aboutUsRoute = require("./routes/aboutUs");
const productRoute = require("./routes/product");
const notFound = require("./routes/notFound");
const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extanded: false }));
app.use(express.static(path.join(rootDir, "public")));
app.use(shopRoutes);
app.use("/admin", adminRoutes);
app.use(productRoute);
app.use(aboutUsRoute);
app.use(notFound);

app.listen(3000);
