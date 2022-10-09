# 浏览器技术

## 跑在浏览器里的是什么？
HTML，CSS，JS
- HTML，CSS -- 浏览器自己玩
- JS --

chrome -- v8
safari -- jscore
firefox -- spiderMoney

## DOM
document

## BOM

### window

#### encodeURIComponent

应用场景：第三方跳转
从知乎、掘金等跳转到第三方链接

#### decodeURIComponent

#### devicePixelRatio

## 事件

### 事件冒泡与捕获

Parent --> Normal --> Son --> a 标签

#### 知识点1：
从外往里，叫做捕获；
从里往外，叫做冒泡

addEventListener 的第三个参数：
false: 默认值，代表冒泡
 true: 代表捕获

#### 知识点2：
几个方法
e.stopPropagation 阻止传播
e.stopImmediatePropagation 阻止其他事件
e.preventDefault 阻止默认事件

#### 知识点3：
target 和 currentTarget 的区别



## Ajax 和 fetch
(async JS and XML)

1. XMLHttpRequest  --  axios
2. fetch
  1. 默认没有 cookie
  2. 错误不会 reject
  3. 不支持超时时间
  4. 需要借助 AbortController 去终止 fetch

## Http 请求头和状态码

### request

method
path
accept
accept-encoding
cache-control
cookie
origin
referer
user-agent

### response

cors:
  access-control-allow-origin
                      -methods
                      -headers
content-type
date
set-cookie
status

### status
200 ok

301 永久重定向
302 临时重定向

304 协商缓存

400 客户端错误

401 没登录，没权限
403 登录了，没权限
404 not found
405,499

500 服务端
501 Bad Gateway
503 services unavailable
504 bad gateway timeout