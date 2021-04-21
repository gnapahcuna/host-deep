const express = require("express");
var fs = require("fs");
var url = require("url");
const app = express();

// use the express-static middleware
app.use(express.static("public"));

// define the first route
app.get("/deeplink", function (req, res) {
  var q = url.parse(req.url, true);
  var filename = "." + q.pathname;
  fs.readFile("./deeplink.html", function (err, data) {
    if (err) {
      res.writeHead(404, { "Content-Type": "text/html" });
      return res.end("404 Not Found");
    }
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write(data);
    return res.end();
  });
});

// start the server listening for requests
app.listen(process.env.PORT || 3000, () => console.log("Server is running..."));
