# node API

Buffer / Stream / Events
事件循环

## Buffer

浏览器中，上传一个文件，blob
ECMAScript 2015 typedArray 更高效的处理和访问二进制。
TypedArray 给 ArrayBuffer 提供一个写的能力。
Blob, File, FileReader

### Buffer 是一个计算机中的数据结构

表示的是一个固定长度的缓冲区序列。

File -> Buffer 的缓冲区 -> wait 进程再去处理

### Buffer 的 API

#### 声明

```js
const buf1 = Buffer.alloc(5);
const buf2 = Buffer.from("江前彪"); // 一个汉字三个字节
// e6 b1 9f e5 89 8d e5 bd aa
const buf3 = Buffer.from([0xe6, 0xb1, 0x9f]);
console.log(buf1); // <Buffer 00 00 00 00 00>
console.log(buf2); // <Buffer e6 b1 9f e5 89 8d e5 bd aa>
console.log(buf3.toString()); // 江
```

#### 拼接

```js
const buf4 = Buffer.from("江前彪");
let new_buf = Buffer.alloc(6);

buf4.copy(new_buf, 0, 0, 2);
buf2.copy(new_buf, 2, 2, 6);

console.log(new_buf.toString("base64"));
```

#### 乱码

1. 中文，特殊语音的编码格式不一致。
2. 我这个 buffer,
