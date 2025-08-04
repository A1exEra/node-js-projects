exports.getAboutUsPage = (req, res, next) => {
  res.render("about-us", { pageTitle: "About Us Page", path: "/404" });
};
