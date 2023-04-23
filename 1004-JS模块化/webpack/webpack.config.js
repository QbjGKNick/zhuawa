const path = require('path')

module.exports = {
  mode: 'development',
  entry: './src/main.js',
  output: {
    filename: '[name]-[contenthash:4].js',
    chunkFilename: '[name]-main.[contenthash:4].js',
    path: path.resolve(process.cwd(), './dist')
  }
}

// // amd 是一个已经过时的规范
// define(['lodash'], function(lodash) {

// })

// // cjs，是一个规范，nodejs 最早实现了它
// const fs = require('fs')
// module.exports = xxx

// // esm，现代浏览器规范
// import xxx from 'xxx'
// export const xxx = xxx
// export default xxx

// // 1. 浏览器中实现了它
// <script type="module">
//   import xxx from 'xxx'
// </script>
// // 2. 各种构建工具支持
// // a.js