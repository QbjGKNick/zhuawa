// const foo = {
//   bar: 10,
//   fn: function() {
//     console.log(this)
//     console.log(this.bar)
//   }
// }

// var fn1 = foo.fn
// fn1()

// const student = {
//   name: 'nick',
//   fn: function() {
//     return this
//   }
// }

// console.log(student.fn() === student)

const o1 = {
  text: 'o1',
  fn: function() {
    return this.text
  }
}
const o2 = {
  text: 'o2',
  fn: function() {
    const m = o1.fn()
    return m
  }
}
const o3 = {
  text: 'o3',
  fn: function() {
    var fn = function() {
      return this.text
    }
    const res = fn()
    return res
  }
}

console.log(o1.fn())
console.log(o2.fn())
console.log(o3.fn())