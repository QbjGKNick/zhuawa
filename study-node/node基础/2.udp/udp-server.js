var dgram = require("dgram");
var server = dgram.createSocket("udp4");

var PORT = 8000;
var HOST = "127.0.0.1";

server.on("listening", function () {
  var address = server.address();
  console.log(
    "UDP Server listening on " + address.address + ":" + address.port
  );
});

server.on("message", function (message, remote) {
  console.log(remote.address + ":" + remote.port + "-" + message);
});

server.bind(PORT, HOST);
