var number = 5
var obj = {
  number: 3,
  fn1: (function() {
    var number;
    this.number *= 2
    number = number * 2
    number = 3
    return function() {
      var num = this.number
      this.number *= 2
      console.log(num)
      number *= 3
      console.log(number)
    }
  })()
}
var fn1 = obj.fn1
fn1.call(null)
obj.fn1()
console.log(window.number)

/**
 * 1. 首先，fn1 是一个 IIFE，所以 JS 解析时，就会执行；
 * 2. fn1 的内部，形成了一个闭包
 * 3. 5-8 行，让第一行的 5 -> 10，第5行的闭包变量 变成了 3
 * 
 * 4. 10-14 行，以 this -> global 的情况执行
 * 5. 第10行，this.number 为，我们刚刚讲的，第一行的 10，然后又默默变成了 20.
 * 6. 12行，直接打印 **10**
 * 7. 13行，注意，number没引用，所以直接走了词法作用域，number 为第5行的值，此时为 3 * 3 = 9
 * 8. ** 9 **
 * 9. 此时，this.number，为第 3 行的 number，所以num = 3
 * 10. 11 行，让第3行的 number 变成了 6
 * 11. 12 行，打印 **3**
 * 12. 13 行，同第7条，此时 9 * 3 = **27**
 * 13. **20**
 */