const getCookieValue = (cookieString, cookieName) => {
  const cookies = cookieString.split(";");
  for (let cookie of cookies) {
    const [name, value] = cookie.trim().split("=");
    if (name === cookieName) {
      console.log(value);
      return value === "true" ? true : false;
    }
  }
};

module.exports = {
  getCookieValue,
};
