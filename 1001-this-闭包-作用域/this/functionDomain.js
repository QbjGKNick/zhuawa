
function foo(a) {
  
  console.log(a + b)

  function bar(c) {
    console.log(a + b + c)
  }

  bar(4)
}

var b = 2

foo(2)
