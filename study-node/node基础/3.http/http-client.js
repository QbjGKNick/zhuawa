let http = require("http");

let options = {
  hostname: "localhost",
  port: 8000,
  path: "/",
  method: "get",
  headers: {},
};

let req = http.request(options);

req.on("response", function (res) {
  res.on("data", function (chunk) {
    console.log(chunk);
  });
});

req.end("jqb client sent");
