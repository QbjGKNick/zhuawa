// 1. 如何并发执行 promise
const promiseArrGenerator = (num) => new Array(num).fill(0).map((item, index) => () => new Promise((resolve, reject) => {
  setTimeout(() => resolve(index), Math.random() * 10)
}))

const proArr = promiseArrGenerator(100)

// Promise.all(proArr.map(fn => fn())).then(res => console.log(res))

// 2. promiseChain 顺序执行这些 promise

// proArr.forEach(fn => fn().then(res => console.log(res)))

// const promiseChain = (proArr) => {
//   proArr.reduce((proChain, pro) => proChain.then(res => {
//     ~res && console.log(res)
//     return pro()
//   }), Promise.resolve(-1))
//   .then(res => console.log(`the last one is ${res}`))
// }

// promiseChain(proArr)

// 3. 设计一个 pipe，我去并发执行一部分
// chrome 6 个并发。100 接口

const promisePipe = (proArr, concurrent) => {
  if (concurrent > proArr.length) {
    return Promise.all(proArr.map(fn => fn())).then(res => console.log(res))
  }

  let _arr = [...proArr]
  // 100 个函数，并发
  for (let i = 0; i < concurrent; i++) {
    let fn = _arr.shift()
    run(fn)
  }

  function run(fn) {
    fn().then(res => {
      console.log(res)
      if (_arr.length) run(_arr.shift())
    })
  }
}

promisePipe(proArr, 10)
