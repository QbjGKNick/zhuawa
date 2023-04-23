const buf1 = Buffer.alloc(5);
const buf2 = Buffer.from("江前彪"); // 一个汉字三个字节
// e6 b1 9f e5 89 8d e5 bd aa
const buf3 = Buffer.from([0xe6, 0xb1, 0x9f]);
// console.log(buf1); // <Buffer 00 00 00 00 00>
// console.log(buf2); // <Buffer e6 b1 9f e5 89 8d e5 bd aa>
// console.log(buf3.toString()); // 江

const buf4 = Buffer.from("江前彪");
let new_buf = Buffer.alloc(6);

buf4.copy(new_buf, 0, 0, 2);
buf2.copy(new_buf, 2, 2, 6);

// console.log(new_buf.toString("utf-8", 0, 6));
// console.log(new_buf.toString("base64"));
// 语言 utf8 utf116 ucs2 hex latin base64

// e6 b1 9f e5 89 8d e5 bd aa
// 是一个 00000000 ~ 11111111
// 11100110 10110001 10011111   24位 3*8
// 111001 101011 000110 011111  4*6
// 00111001 00101011 00000110 00011111 每个前面补2个0凑齐8位，每一个8位表示二进制数范围 0~63
// A-Z 26 a-z 26 0-9 + /
// 0~25   26~51  52~63
// A B C D E F G H I J K  L  M  N  O  P  Q  R  S  T  U  V  W  X  Y  Z
// 0 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25
// a  b  c  d  e  f  g  h  i  j  k  l  m  n  o  p  q  r  s  t  u  v  w  x  y  z
// 26 27 28 29 30 31 32 33 34 35 36 37 38 39 40 41 42 43 44 45 46 47 48 49 50 51
// 0  1  2  3  4  5  6  7  8  9  +  /
// 52 53 54 55 56 57 58 59 60 61 62 63
// 57 43 6 31
// 5  r  G f

// base64 -> base64URL
// 1. + -> _
// 2. / -> _
// 3. = 去掉

// base64Url -> base64
//

// console.log(Buffer.isBuffer(buf1))

const fs = require("fs");
const path = require("path");

// fs.readFile(
//   path.resolve(__dirname, "../../README.md"),
//   "utf-8",
//   function (err, data) {
//     fs.writeFile(path.resolve(__dirname, "../../RE.md"), data, function (err) {
//       console.log("success");
//     });
//   }
// );

let buf = Buffer.alloc(50);

fs.open(path.resolve(__dirname, "./a.js"), "r", function (err, rfd) {
  fs.read(rfd, buf, 0, 50, 0, function (err, bytesRead) {
    console.log(buf);

    fs.open(path.resolve(__dirname, "./b.js"), "w", 0o666, function (err, wfd) {
      fs.write(wfd, buf, 0, 50, 0, function (err, written) {
        console.log("success", err, written);
        fs.close(wfd);
      });
    });
  });
});
