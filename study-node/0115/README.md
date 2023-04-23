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

blob -- binary large object
new Blob()
slice

URL.revokeObjectURL

## stream

```js
const res = fs.createReadStream(path.resolve(__dirname. './a.js'), {
  flags: 'r',
  start: 0,
  end: 1000,
  highWaterMark: 20, //64K
  autoClose: true,
  emitClose: true
})
```

## eventEmitter

发布订阅 和 观察者
我让我的函数，在该执行的时候，进行执行

```js
new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(1);
  }, 1000);
}).then((res) => {
  console.log("xxx");
});
```

```js
const e = new EventEmitter();

e.on("test", (params) => {
  console.log(params);
});

e.emit("test", params);
```

```js
char.on("click", (event) => {});
```

### node 事件循环

#### 事件循环这个事情，是宿主环境做的。

所以说。浏览器的事件循环，和 node 的事件循环是不一样的。

AIO 异步非阻塞 I/O
餐厅的服务员。

```
          同步的代码
              |
   process.nextTick / promise...
              |
  _____________________________
->  |          timers           | 定时器: setTimeout / setInterval
|  _____________________________
|              |
|   process.nextTick / promise
|              |
|  _____________________________
|  |     pending callbacks     | 执行延迟到下一个循环迭代的I/O回调
|  _____________________________
|              |
|   process.nextTick / promise...
|              |
|  _____________________________
|  |        idle, prepare       | 系统内部使用，闲置阶段
|  _____________________________
|              |
|   process.nextTick / promise...      __________________
|              |                       |                |
|  _____________________________       |    incoming:   |
|  |          poll   轮训阶段   | <-----|  connections,  |
|  _____________________________       |    data, etc.  |
|              |                       ——————————————————
|   process.nextTick / promise...
|              |
|  _____________________________
|  |          check  检查阶段   | setImmediate
|  _____________________________
|              |
|   process.nextTick / promise...
|              |
|  _____________________________
——|       close callbacks     | 关闭回调函数阶段
  _____________________________   socket.on('close', func....)
```

#### node.js 运行机制

- V8 解析 JS 的脚本
- 解析后的 JS 代码，调用 Node API
- libuv 库负责 Node API 的执行，将不同的任务，分配给不同的线程，形成一个环
- 以异步的方式，将任务的执行结果，返回给 V8
- V8 再将结果返回给用户

### node.js 事件循环的阶段

1. timer
   执行 setTimeout / setInterval 回调，并且是由 poll 阶段控制的。
2. pending callbacks
   执行部分的回调，除了 close, times, setImmediate 设置的回调
3. idle, prepare

4. poll - 在适当的条件下，node 会在这里阻塞
   如果没有 timer，会发生两件事情

   - 如果 poll 队列不为空，会遍历回调队列，并同步执行。
   - 如果 poll 为空
     - 有 setImmediate，执行
     - 没有 setImmediate

```js
async function async1() {
  console.log("async1 started"); // 2
  await async2();
  console.log("async end");
}

function mock_async1() {
  console.log("async1 started");
  new Promise((resolve) => {
    async2();
    resolve();
  }).then((res) => {
    console.log("async end"); // 8
  });
}

async function async2() {
  console.log("async2"); // 3
}
console.log("script start."); // 1
setTimeout(() => {
  console.log("setTimeout0"); // 10
  setTimeout(() => {
    console.log("setTimeout1"); // 12
  }, 0);
  setImmediate(() => {
    console.log("setImmediate"); // 11
  });
}, 0);

async1();
process.nextTick(() => {
  console.log("nextTick"); // 7
});

new Promise((resolve) => {
  console.log("promise1"); // 4
  resolve();
  console.log("promise2"); // 5
}).then(() => {
  console.log("promise.then"); // 9
});
console.log("script end."); // 6
```

https://medium.com/lightrall/getting-token-authentication-right-in-a-stateless-single-page-application-57d0c6474e3

## 安全

1. 通信链路 - https

   1. 证书
   2. 非对称加密
   3. 对称加密

2. JWT 或者 authentication cookie 到底存在哪里？

cookie 存储。
HttpOnly cookie / JS enabled / xss enabled
secure cookie / https
Samesite cookie / cors enabled / csrf enabled

JWT: [header, payload, signature]

[signature]session cookie [lifecycle: session]
httponly, samesite, secure.

---

[random number], [payload] permanent cookie [lifecycle: permant]
samesite, secure.

helmetjs

埋点
error

    - js onerror
    - promise
    - white screen

xpath

中间层。 localStorage
10

神策数据
诸葛IO