# Node 基础

## node 怎么学？

- 心智，传统的前端的编程，转变为后端的编程思路
  前端的编程，更倾向于，声明式编程

```vue
<template>
  <div>
    <h1>{{ msg }}</h1>
    <button @click="">click</button>
    <ul>
      <li v-for="item of dataList" :key="item.key"></li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      msg: "hello",
      dataList: [],
    };
  },
  method: {
    apiGetData() {
      this.msg = "loading...";
      fetch("./api").then((res) => {
        if (res.code) {
          this.dataList = res.data;
        }
        this.msg = "hello";
      });
    },
  },
};
</script>
```

### 命令式编程

```java
class Test {
  public static void main(String[] args) {
    // run ...
  }
}
```

```bash
node ./index.js
```

- 计算机操作系统的东西，要有一些了解
- 模块，koa/express ORM: typeORM, sequelize

## node 学了干嘛？

不设边界。

## node 简介

### node 是不是单线程的？

js 是单线程的。

宿主环境。

```js
// index.js node index.js
// <script src="index.js"></script>
console.log("hello world");
```

2 个过程

1. console.log('hello world') 这句字符串，需要被解析
1. 需要被解析：console 是一个对象。log 是一个函数，hello world 是一个字符串，作为 log 的参数
1. 需要被执行：hello world 这句话被打印出来。

1. console.log(document.getElementsByTagName('head')[0])
1. 需要被解析：console 是一个对象。log 是一个函数，[document.getElementsByTagName('head')[0]] 作为 log 的参数
1. 需要被执行：document.getElementsByTagName('head')[0] 这句话被打印出来。

V8 在做。
是否能被执行，是宿主环境决定的。

node: V8 + node API --> 操作磁盘[fs,path]，处理网络[http,net]，多进程[cluster]，操作系统[os]，加密[openssl]，压缩[zlib]
chrome: V8 + browser API --> 处理和显示 dom[document]，窗口[window]，屏幕[screen]...

**写前端的本质，是不是就是操作 DOM 和 BOM？**
**写 node 的本质，是不是就是操作 OS 的资源？**
**写代码的本质，是不是就是操作宿主环境提供的 API，来实现应有的功能**

node 是一个架构。js 是作为这个结构的语音。V8 是用来解析这个语言的。

node 的架构
——————————————————————————————————————————————————————————————————————————————————

Native Modules : 1. 暴露给开发者使用的接口，是 js 实现：fs, path, http 等模块的一部分

——————————————————————————————————————————————————————————————————————————————————

Builtin Modules : 通过这个中间层，可以让 node 获取一些更底层的操作

——————————————————————————————————————————————————————————————————————————————————

| V8 | libuv | http-parser | openssl | zlib |

libuv: c 写的，一个高性能的，异步非阻塞的 IO 库，实现事件循环的。
http-parser: 处理网络报文
openssl: 处理加密算法
zlib: 文件压缩

——————————————————————————————————————————————————————————————————————————————————

CPU，GPU，RAM，DISK，OS
——————————————————————————————————————————————————————————————————————————————————

### node 是什么？

> node.js 是一个 js 的服务端 运行环境。 基于 V8, 在 JS 语言规范的基础上，封装了一些服务端的 runtime，让我们能够简单地实现非常多的业务功能。

- 高性能的 web 服务器。
- commonjs 规范为标准，node 是 cjs 的实现。

### node 的历史

LAMP / XAMP / WAMP

- linux/windows + Apache + MySql + PHP（thinkPHP, CI）
  MEAN
- mongoB + express + angular + node.js 2014 年

### node 可以做什么？

npm run start -- node

- 跨端开发：weex，RN，PC
- 后端开发：koa，express，egg
- 前端开发：webpack，rollup
- 工具开发：脚本，脚手架，命令行

### node 分类举例

压缩 UglifyJS，JSmin
依赖 npm, bower,
模块 commonjs
css postcss
构建 gulp grunt webpack
模版 jade handlebars
跨端 electron tuari

### node 的问题

- js 是单线程，很脆弱 cluster / pm2
- node 对 mongoDB，mysql，redis 支持比较好，ES，neo4j，tigerGraph

### 和浏览器的区别

- node 没有 dom, bom, 浏览器没有 fs path
- 事件循环
- cjs / esm

## node 的应用 和 npm

### node 的安装

- nvm
  - 当我需要多个版本的时候，我可以通过 nvm 去切换
- nrm
- npm
- yarn

### npm 和 yarn 的区别

- npm 还没有到 v5 版本的时候
  - lock 的机制，差别是很大的。
  - npm V5.0.x: 根据 package-lock.json 下载的
  - npm V5.1.0-V5.4.2: 如果 package.json 有符合的更新版本，忽略 package-lock.json，按照 package.json 进行安装
  - npm V5.4.2 以上 如果 pkg 和 lock 兼容，则根据 lock 安装，如果不兼容，则根据 pkg 安装，然后更新 lock

yarn 就是 V5.4.2 以上的规则
yarn 刚出现的时候

- lock
- 扁平化安装
- 网络更好一些，yarn 请求派对
- 缓存机制

cache 命令
`npm config get cache` `yarn cache dir`

- yarn
  - why pack autoclean license import
- npm
  - rebuild

synp -- yarn.lock 转成 package-lock.json

yarn 在安装的时候，会自动地整理，但是 npm 不会，需要手动执行`npm dedupe`的命令

### npm 的包依赖关系

A 1.0 | B 1.0

A 1.0 | B 1.0 | C 1.0 | D 1.0
B 2.0 | B 2.0

A 1.0 | B 1.0 | C 1.0 | D 1.0
B 1.0

npm debupe 做一个诊断，帮助我们去整理包依赖关系

### 为什么 nodemon ./index.js 可以直接运行？

### npm 包依赖的关系

#### dependencies 项目依赖

npm i -S
lodash
import { debounce } from 'lodash'

#### devDependencies 依赖

npm i -D
webpack rollup eslint

#### peerDependencies 依赖

- 不能单独运行
- 我能正确运行的前提，是你安装了核心包
- 我不希望核心包被重复下载

#### bundleDependencies 依赖

#### optionalDependencies 依赖

### 组件发布 npm 仓库

npm publish

```json
{
  "name": "@jqb/plugin",
  "main": "dist/jqb.js",
  "module": "lib/jqb.js",
  "files": ["/lib", "/dist"]
}
```

npm i @jqb/plugin

import JqbPlugin from '@jqb/plugin'

scope 命名管理

### 软链接

npm link

## 模块化的方案

- 隔离变量
- 相互通信

```js
function foo() {
  var bar = 1
  var baz = 2
}
```

```js
var obj = {
  a: {

  }
}

function resolve(a) {
  var bar = 1
  var baz = 2
  a = {
    bar, baz
  }
}

resolve(obj.a)
```

```js
var module = {
  exports: {

  }
}

function resolve(module, exports) {
  var bar = 1
  var baz = 2
  module.exports = {
    bar, baz
  }
}

resolve(module, module.exports)
```