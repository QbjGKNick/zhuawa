const fs = require("fs");
const path = require("path");

// const res = fs.createReadStream(path.resolve(__dirname, "./a.js"), {
//   flags: "r",
//   start: 0,
//   end: 1000,
//   highWaterMark: 20, //64K
//   autoClose: true,
//   emitClose: true,
// });

// let arr = [];
// res.on("open", function (fd) {
//   console.log("fd", fd);
// });

// res.on("data", function (data) {
//   console.log("data", data);
//   arr.push(data);
// });

// res.on("end", function (data) {
//   console.log("end", Buffer.concat(arr).toString());
// });

const zlib = require("zlib");

const res = fs
  .createReadStream(path.resolve(__dirname, "./a.js"))
  .pipe(zlib.createGzip())
  .pipe(fs.createWriteStream(path.resolve(__dirname, "./a.js.gz")));
