const User = require("../models/user");

exports.getLogin = (req, res, next) => {
  res.render("auth/login", {
    path: "/login",
    pageTitle: "Login",
    isAuthenticated: false,
  });
};

exports.postLogin = (req, res, next) => {
  User.findById("65ef18c4c220f9a57583d248")
    .then((user) => {
      if (!user) {
        console.log("User not found, creating new user...");
        // If user not found, create a new one with the specific ID
        const newUser = new User({
          _id: "65ef18c4c220f9a57583d248", // Use specific ID
          name: "Alex",
          email: "alex@test.com",
          cart: {
            items: [],
          },
        });
        return newUser.save();
      }
      return user;
    })
    .then((user) => {
      req.user = user;
      req.session.isLoggedIn = true;
      res.redirect("/");
    })
    .catch((err) => {
      console.log("Error in user middleware:", err);
      req.isLoggedIn = false;
    });
};

exports.postLogout = (req, res, next) => {
  req.session.destroy((err) => {
    console.log(err);
    res.redirect("/");
  });
};
