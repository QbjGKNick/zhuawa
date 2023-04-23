// RequireJS 依赖前置
define('a', function () {
  console.log('a load')
  return {
    run: function () { console.log('a run') }
  }
})

define('b', function () {
  console.log('b load')
  return {
    run: function () { console.log('b run') }
  }
})

require(['a', 'b'], function (a, b) {
  console.log('main run') // 🔥
  a.run()
  b.run()
})

// a load
// b load
// main run
// a run
// b run