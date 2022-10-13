# 模块化

## 最重要的一节课
### 1. 基石
### 2. 抽象
### 3. 构建整个前端“知识体系”的基础

## 什么是模块化？
```html
<HTML>
  <body>
  </body>
  <script>
    var dom = document.getElementById('xxx')
  </script>
</HTML>
```

问题：
1. 全局污染，为什么是问题？
2. 协作。

## 软件工程的本质是什么？
任何技术的演进，一定是有需求的推动的。

我们做软件工程： 管理变量。
我们做软件： 展示数据。
DB --> 后端 -->
MySQL，noSQL，graphSQL，HDFS，存储的就是数据。
业务需求 -> 业务模型 -> 数据模型 -> 接口 -> 展示，交互（展示）。

“任何一个工种的产生，都是为了精细化企业分工，提高工作效率。”

管理的视角。架构的视角。

能力得到增强 -- 需求也在增强 -- 迫切需要管理。

更好的管理，组织和通信。

## 为什么要用模块化？
问题：
1. 全局污染，协作，业务解耦。
2. 模块化，避免集体的熵增。
  1. 领导说，有个功能，之前在哪个项目实现过，你去直接拿过来用；
  2. 熵增：一个系统，一个组织，在没有外界耗散系统干预的情况下，一定会逐渐趋于混乱。
  3. 屎山，是不可避免的。
  4. [局部的熵增，优于 集体的熵增]。

3. 关注点分离。SoC
  1. 关注接口
  2. 把复杂的问题，拆分成很多小问题。

4. 更优雅的代码管理、替换、复用、拓展、内聚

## 什么是模块？
我认为，模块的概念，是由架构师，和开发人员自己决定的。
核心来说，就是一种 提供 对外通信的接口。


由架构师，确定互相通信的方式，从而组成了架构。

## 模块化的发展历史

1. 函数时期

浏览器脚本
```js
function fn() {

}
```

2. 命名空间
模块化的思路雏形初显。
```js
var student = {
  name: 'nick',
  getName: function() {

  }
}

student.name
student.getName()
```

3. 闭包的出现

```js
(function(global) {
  var name = 'nick'

  function getName() {}

  global.student = { name, getName }
})(window)
```

怎么解决依赖问题
```js
(function(global, $) {
  var name = 'nick'

  function getName() {}

  global.student = { name, getName }
})(window, jquery)
```

```js

var module = {
  exports = {

  }
}

(function(modules, exports, require) {
  var name = 'nick'

  function getName() {}

  modules.exports = { name, getName }

  exports.name = name
})(modules, modules.exports, requre)

// require 函数，以一个路径作为参数，函数的功能是，读取路径指向的 js 文件的地址，然后把文件读出来，以 js 的形式解析。

```

cjs 本质是，值的拷贝，意味着，我在浏览器端，不适用。

## AMD 规范
## CMD 规范