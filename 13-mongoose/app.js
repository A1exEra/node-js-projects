require("dotenv").config();
const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const path = require("path");
const rootDir = require("./utils/path");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const MongoDbStore = require("connect-mongodb-session")(session);
const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const authRoutes = require("./routes/auth");
const notFound = require("./routes/notFound");

const User = require("./models/user");
const app = express();
const Store = new MongoDbStore({
  uri: process.env.MONGODB_URI,
  collection: "sessions",
});

app.set("view engine", "ejs");
app.set("views", "views");

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(rootDir, "public")));
app.use(
  session({
    secret: "secret-password",
    resave: false,
    saveUninitialized: false,
    store: Store,
  }),
);

// app.use((req, res, next) => {
//   if (!req.session.user) {
//     console.log("No user found in session cookies");
//     return;
//   }
//   User.findById(req.session.user._id)
//     .then((user) => {
//       req.session.isLoggedIn = true;
//       req.session.user = user;
//       req.session.save((err) => {
//         console.log(err);
//         res.redirect("/");
//       });
//       next();
//     })
//     .catch((err) => {
//       console.log("Error in user middleware:", err);
//     });
// });

app.use((req, res, next) => {
  if (!req.session.user) {
    return next();
  }
  User.findById(req.session.user._id)
    .then((user) => {
      if (!user) {
        return next();
      }
      req.user = user;
      req.isLoggedIn = req.session.isLoggedIn;
      next();
    })
    .catch((err) => {
      console.log("Error in user middleware:", err);
      next();
    });
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);
app.use(notFound);

mongoose
  .connect(process.env.MONGODB_URI)
  .then((result) => {
    User.findOne().then((user) => {
      if (!user) {
        const user = new User({
          name: "God OF Code",
          email: "god@fCode.com",
          cart: {
            items: [],
          },
        });
        user.save();
      }
    });
    app.listen(process.env.PORT || 3000, () => {
      console.log(`Server running on port ${process.env.PORT || 3000}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
