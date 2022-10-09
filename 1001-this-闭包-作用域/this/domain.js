
function foo(a) {
  b = 2
  console.log(a + b)
}

foo(2)

console.log(global.b)

process.nextTick