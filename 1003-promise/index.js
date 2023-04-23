// const JPromise = require('./Promise2')
// let p = new JPromise((resolve, reject) => {
//   setTimeout(() => {
//     resolve('hello')
//   }, 1000)
//   // resolve('hello')
// })

// p.then(res => {
//   console.log(1, res)
// })
// p.then(res => {
//   console.log(2, res)
// })
// p.then(res => {
//   console.log(3, res)
// })

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