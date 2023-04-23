function foo() {
  let num = 1
  return function () {
    console.log(num++)
  }
}

let bar = foo()
bar()
bar()
bar()
bar()
bar()