var dgram = require("dgram");
var client = dgram.createSocket("udp4");

var msg = Buffer.from("jqb is broadcast here");
var port = 8000;
var host = "127.0.0.1";

client.bind(function () {
  client.setBroadcast(true);
  client.send(msg, port, host, function (err) {
    if (err) throw err;
    console.log("msg has been sent");
    client.close();
  });
});
