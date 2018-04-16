/* global require */
var http = require("http");
var fs = require("fs");
var extract = require("./extract");
var Mime = require("mime-types");
var wss = require("./websockets-server");

var handleError = function(err, res) {
  res.writeHead(404);
  res.end();
};
var server = http.createServer(function(req, res) {
  /*eslint no-console: ["error", { allow: ["warn", "error","log"] }] */
  console.log("Responding to a request.");
  console.log(wss);
  var filePath = extract(req.url);
  fs.readFile(filePath, function(err, data) {
    if (err && err.errno == -4058) {
      fs.readFile("app/error.html", function(err, data) {
        res.end(data);
      });
    } else if (err) {
      handleError(err, res);
      return;
    } else {
      var type = Mime.lookup(filePath);
      console.log (type);
      console.log (filePath);
      res.setHeader("Content-Type", type);
      res.end(data);
    }
  });
});
server.listen(3000);
