var dgram = require("dgram");
var server = dgram.createSocket("udp4");
var port = 8000;

server.on("message", function (message, rinfo) {
  console.log(
    "server got messge from: " +
      rinfo.address +
      ":" +
      rinfo.port +
      "\n" +
      message
  );
});

server.bind(port);
