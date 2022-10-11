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
  // try catch
  execute(resolve, reject)
}

JPromise.prototype.then = function(onFulfilled, onRejected) {
  onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : data => data
  onRejected = typeof onRejected === 'function' ? onRejected : error => { throw error }

  let promise2

  if (this.status === 'fulfilled') {
    return promise2 = new JPromise((resolve, reject) => {
      queueMicrotask(() => {
        try {
          let result = onFulfilled(this.value)
          resolve(result)
        } catch(e) {
          reject(e)
        }
      })
    })
  }

  if (this.status === 'rejected') {
    return promise2 = new JPromise((resolve, reject) => {
      queueMicrotask(() => {
        try {
          let result = onRejected(this.reason)
          resolve(result)
        } catch(e) {
          reject(e)
        }
      })
    })
  }

  if (this.status === 'pending') {
    return promise2 = new JPromise((resolve, reject) => {
      this.onFulfilledArray.push(() => {
        try {
          let result = onFulfilled(this.value)
          resolve(result)
        } catch (e) {
          reject(e)
        }
      })
      this.onRejectedArray.push(() => {
        try {
          let result = onRejected(this.reason)
          resolve(result)
        } catch (e) {
          reject(e)
        }
      })
    })
  }
}

module.exports = JPromise