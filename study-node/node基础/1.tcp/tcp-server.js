var net = require("net");

var server = new net.Server(); // 创建了一个服务器对象

server.on("connection", function (socket) {
  console.log("someone connected");
  var address = server.address();

  var message = "the server address is: " + JSON.stringify(address);

  // 发送数据
  socket.write(message, function () {
    var writeSize = socket.bytesWritten;
    console.log(message + ", has sent");
    console.log("the size of message is: ", writeSize);
  });

  // 监听接收数据
  socket.on("data", function (data) {
    console.log(data.toString());
    var readSize = socket.bytesRead;
    console.log("the size of data is: " + readSize);
  });
});

server.listen(8000, function () {
  console.log("create server on http://127.0.0.1:8000");
});
