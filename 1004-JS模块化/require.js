const { readFileSync } = require('fs')
const { Scrippt, runInThisContent, Script } = require('vm')

const path = require('path')

function my_require(filename) {
  const fileContent = readFileSync(path.resolve(__dirname, filename), 'utf-8')
  // Script 是编译 js 代码的字符串

  const wrappedContent = `(function(require, module, exports) {
    ${fileContent}
  })`

  const scripts = new Script(wrappedContent, {
    filename: 'index.js'
  })

  const module = {
    exports: {}
  }

  // 在当前 global 对象的上下文中运行 vm.Script 包含的编译代码
  const res = scripts.runInThisContext()
  // res 是我上面的那个包裹着文件的得到的函数
  res(my_require, module, module.exports)
  return module.exports
}

global.my_require = my_require

my_require('./index.js')