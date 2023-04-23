# Promise

## Promise 的术语
1. `promise`是一个有`then`方法的对象或者是函数，行为遵循本规范
2. `thenable`是一个有`then`方法的对象或者是函数
3. `value`是`promise`状态成功时的值，也就是`resolve`的参数，表示结果的数据
4. `reason`是`promise`状态失败时的值，也就是`reject`的参数，表示拒绝的原因
5. `exception`是一个使用`throw`抛出的异常值

## Promise 的用法

- Promise 是一个构造函数
- Promise 接收一个函数作为参数，这个函数的参数，是两个函数。
- Promise 返回的对象，包含一个 then 函数，这个 then 函数，接收两个参数，这两个参数，也都是函数。
[rule--]
Promise 的 status
1. `pending`
- 初始的状态，可改变
- 一个 Promise 在 `resolve` / `reject` 前都处于这个状态
- 我们可以通过调用 `resolve` 方法或者 `reject` 方法，让这个 Promise 变成 `fulfilled` / `rejected` 状态

2. `fulfilled`
- 不可变状态
- 在 `resolve` 之后，变成这个状态，拥有一个 `value`

3. `rejected`
- 不可变状态
- 在 `reject` 之后，变成这个状态，拥有一个 `reason`

then 函数
1. 参数
`onFulfilled`、`onRejected` 必须是函数类型，如果不是，应该被忽略；

2. onFulfilled 和 onRejected 的特性
在 promise 变成 `fulfilled` / `rejected` 状态 的时候，应该调用 `onFulfilled` / `onRejected`;
在 promise 变成 `fulfilled` / `rejected` 状态 之前，不应该被调用；
只能调用一次
[--rule]

```js
// - Promise 是一个构造函数
// - Promise 接收一个函数作为参数，这个函数的参数，是两个函数。
// - Promise 返回的对象，包含一个 then 函数，这个 then 函数，接收两个参数，这两个参数，也都是函数。
// [rule--]
// Promise 的 status
// 1. `pending`
// - 初始的状态，可改变
// - 一个 Promise 在 `resolve` / `reject` 前都处于这个状态
// - 我们可以通过调用 `resolve` 方法或者 `reject` 方法，让这个 Promise 变成 `fulfilled` / `rejected` 状态

// 2. `fulfilled`
// - 不可变状态
// - 在 `resolve` 之后，变成这个状态，拥有一个 `value`

// 3. `rejected`
// - 不可变状态
// - 在 `reject` 之后，变成这个状态，拥有一个 `reason`

// then 函数
// 1. 参数
// `onFulfilled`、`onRejected` 必须是函数类型，如果不是，应该被忽略；

// 2. onFulfilled 和 onRejected 的特性
// 在 promise 变成 `fulfilled` / `rejected` 状态 的时候，应该调用 `onFulfilled` / `onRejected`;
// 在 promise 变成 `fulfilled` / `rejected` 状态 之前，不应该被调用；
// 只能调用一次
// [--rule]

function JPromise(execute) {

  this.status = 'pending'
  this.value = null
  this.reason = null

  const resolve = (value) => {
    if (this.status === 'pending') {
      this.value = value
      this.status = 'fulfilled'
    }
  }
  const reject = (reason) => {
    if (this.status === 'pending') {
      this.reason = reason
      this.status = 'rejected'
    }
  }

  execute(resolve, reject)
}

JPromise.prototype.then = function(onFulfilled, onRejected) {
  onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : data => data
  onRejected = typeof onRejected === 'function' ? onRejected : error => { throw error }

  if (this.status === 'fulfilled') {
    onFulfilled(this.value)
  }

  if (this.status === 'rejected') {
    onRejected(this.reason)
  }
}

module.exports = JPromise
```

但是：
```js
const JPromise = require('./Promise1')
new JPromise((resolve, reject) => {
  setTimeout(() => {
    resolve()
  })
 }).then(res => {
  console.log(res)
})
```
以上，不work。

[划个重点]
问题在于，我们在 resolve 的时候，then 函数，已经执行过了。
所以，我们要把函数收集起来
在一个合适的时机去执行它

再换句话说，我们需要在一个合适的时间，去通知 onfulfilled 执行

-- 发布订阅。

[rule--]
3. onfulfilled 和 onrejected 应该是微任务
（我们暂时用 setTimeout 或者 queueMicrotask 来代替）
[--rule]

```js
function JPromise(execute) {

  this.status = 'pending'
  this.value = null
  this.reason = null

  this.onFulfilledArray = []
  this.onRejectedArray = []

  const resolve = (value) => {
    queueMicrotask(() => {
      if (this.status === 'pending') {
        this.value = value
        this.status = 'fulfilled'
        this.onFulfilledArray.forEach(func => func(value))
      }
    })
  }
  const reject = (reason) => {
    queueMicrotask(() => {
      if (this.status === 'pending') {
        this.reason = reason
        this.status = 'rejected'
        this.onRejectedArray.forEach(func => func(reason))
      }
    })
  }

  execute(resolve, reject)
}

JPromise.prototype.then = function(onFulfilled, onRejected) {
  onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : data => data
  onRejected = typeof onRejected === 'function' ? onRejected : error => { throw error }

  if (this.status === 'fulfilled') {
    onFulfilled(this.value)
  }

  if (this.status === 'rejected') {
    onRejected(this.reason)
  }

  if (this.status === 'pending') {
    this.onFulfilledArray.push(onFulfilled)
    this.onRejectedArray.push(onRejected)
  }
}

module.exports = JPromise
```

[question]
为什么要用数组？

[rule--]
4. then 方法，可以多次被调用
- promise 的状态变成 `fulfilled` / `rejected` 后。所有的 `onfulfilled` / `onrejected` 都会按照 then 的顺序执行，也就是 注册顺序执行。
[--rule]

实现：
```js
function JPromise(execute) {

  this.status = 'pending'
  this.value = null
  this.reason = null
  
  // 这个数组是解决 then 方法，可以被多次调用的问题
  this.onFulfilledArray = []
  this.onRejectedArray = []

  const resolve = (value) => {
    queueMicrotask(() => {
      if (this.status === 'pending') {
        this.value = value
        this.status = 'fulfilled'
        this.onFulfilledArray.forEach(func => func(value))
      }
    })
  }
  const reject = (reason) => {
    queueMicrotask(() => {
      if (this.status === 'pending') {
        this.reason = reason
        this.status = 'rejected'
        this.onRejectedArray.forEach(func => func(reason))
      }
    })
  }

  execute(resolve, reject)
}

JPromise.prototype.then = function(onFulfilled, onRejected) {
  onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : data => data
  onRejected = typeof onRejected === 'function' ? onRejected : error => { throw error }

  if (this.status === 'fulfilled') {
    onFulfilled(this.value)
  }

  if (this.status === 'rejected') {
    onRejected(this.reason)
  }

  if (this.status === 'pending') {
    this.onFulfilledArray.push(onFulfilled)
    this.onRejectedArray.push(onRejected)
  }
}

module.exports = JPromise
```

但是：

```js
const JPromise = require('./Promise2')
let p = new JPromise((resolve, reject) => {
  setTimeout(() => {
    resolve('hello')
  }, 1000)
  // resolve('hello')
}).then(res => {
  console.log(res)
  return res + 'nick'
}).then(res => {
  console.log(res)
})
```
以上 不 work

[rule--]
5. then 方法，应该返回一个 promise
```js
promise2 = promise1.then(onFulfilled, onRejected)
```
- onFulfilled / onRejected 的执行结果 为 x，调用 resolvePromise;
- 如果 onFulfilled / onRejected 执行抛出异常，我们的 promise2 需要被 reject
- 如果 onFulfilled / onRejected 不是一个函数，promise2 以 promise1 的 value / reason 触发 fulfilled 和 rejected
[--rule]

onfulfilled 返回了一个值，是 then 返回的 promise 需要 resolve 的。

[选读]
### 如何实现 resolvePromise
```js
resolvePromise(promise2, x, resolve, reject)
```

6. resolvePromise 的规范
- 如果 promise2 和 x 相等，那么 reject error;
- 如果 x 是一个 promise
  - 如果 x 是一个 pending 状态，那么 promise 必须要在 peding，直到 x 变成 fulfilled or rejected
  - 如果 x 被 fulfilled，fulfill promise with the same value
  - 如果 x 被 rejected,  reject promise with the same reason

- 如果 x 是一个 object 或者 function
  - let thenable = x.then
  - 如果 x.then 这一步出错，那么 reject promise with e as the reason
  - 如果 then 是一个函数，then.call(x, resolvePromiseFn, rejectPromiseFn)
      resolvePromiseFn 的入参是 y，执行 resolvePromise(promise2, y, resolve, reject)
      rejectPromiseFn 的入参是 r，reject promise with r。
      如果 resolvePromise 和 rejectPromise 都调用了，那么第一个调用优先，后面的调用忽略。
      如果调用 then 抛出异常 e
        如果 resolvePromise 或 rejectPromise 已经被调用，那么忽略
        则，reject promise with e as the reason
    如果 then 不是一个 function,fulfill promsie with x