var net = require("net");
var client = new net.Socket();

client.connect(8000, "127.0.0.1", function () {
  console.log("connect the server");

  client.write("message from client");
});

client.on("data", function (data) {
  console.log("the data of server is: ", data.toString());
});
