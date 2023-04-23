// // js 中，有个东西叫做 伪数组
// // arguments

// function getInfo() {
//   console.log(Array.prototype.slice.call(arguments, 0 ,1))
// }

// getInfo('a', 'b', 'c')

Function.prototype.bind = function (context) {
  // context 是我们要被绑定的对象
  // this 就是我的 fn
  const me = context
  const fn = this
  const args = Array.prototype.slice.call(arguments, 1)
  return function(...innerArgs) {
    const allArgs = [...args, ...innerArgs]
    return fn.apply(me, allArgs)
  }
}

const o1 = {
  text: 'o1',
  fn: function(...rest) {
    console.log(this.text, ...rest)
  }
}
const o2 = {
  text: 'o2'
}

const m = o1.fn.bind(o2, 'luyi', 'xianzao')
m('yunyin')


function call(context, ...rest) {
  context.fn = this
  if (context) {
    const result = context.fn(...rest)
    delete context.fn
    return result
  } else {
    this(...rest)
  }
}