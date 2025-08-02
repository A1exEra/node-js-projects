const fs = require("fs");

const requestHandler = (req, res) => {
  const { url, method, headers } = req;
  // console.log(url, method, headers);
  res.setHeader("Content-Type", "text/html");
  if (url === "/") {
    res.write(
      `<html>
  <head>
  <title>Send a message</title>
  </head>
  <body>
  <h1>Enter your message</h1>
  <form action="/message" method="POST">
  <input type="text" name="message"/>
  <button type='submit'>Submit</button>
  </form>
  </body>
  </html>`,
    );
    return res.end();
  }
  if (url === "/test") {
    res.write(
      "<html><head><title>TEST Page</title></head><body><h1>This is the TEST page</h1></body></html>",
    );
  }
  if (url === "/message" && method === "POST") {
    const body = [];
    req.on("data", (chunkOfData) => {
      // console.log(chunkOfData);
      body.push(chunkOfData);
    });
    return req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      // console.log(parsedBody);
      const message = parsedBody.split("=")[1].split("+").join(" ");
      fs.writeFile("message.txt", message, (err) => {
        res.statusCode = 302;
        res.setHeader("Location", "/");
        return res.end();
      });
    });
  }
  res.write(`<html>
<head>
<title>Hoem page</title>
</head>
<body>
<h1>Hello World</h1>
</body>
</html>`);
  // process.exit();

  res.end();
};

module.exports = requestHandler;
