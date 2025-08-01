const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const notFound = require("./routes/notFound");
const app = express();

app.use(bodyParser.urlencoded({ extanded: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use(shopRoutes);
app.use("/admin", adminRoutes);
app.use(notFound);

app.listen(3000);
