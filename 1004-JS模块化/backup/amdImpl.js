const globalDeps = {

}

// 定义一个 require
var require = {}

// 简单一些，直接 mixin

// 这里我们还是收集依赖关系，我们等一下再处理，
// 所以，我们定义一个 Map
// 我们先把这个模块存起来，我要用的时候，再去加载
var define = (name, deps, handler) => {
  globalDeps[name] = { deps, handler }
}

// 使用一个开源的 system 的方式引入
const __import = url => new Promise((resolve, reject) => System.import(url).then(resolve, reject))

const __getUrl = dep => location.pathname.slice(0, location.pathname.lastIndexOf('/')) + '/js/libs' + dep + '.js'

const __load = url => {
  return new Promise((resolve, reject) => {
    const head = document.getElementsByTagName('head')[0]
    const node = document.createElement('script')
    node.type = 'text/javascript'
    node.src = url
    node.async = true
    node.onload = resolve
    node.onerror = reject
    head.appendChild(node)
  })
}

// ['foo'], function(foo) {}
// 你的模块从哪里来，是不是你的 config 里面配置的，那你是不是要去取
// 这个过程是不是异步的，怎么办，promise
require = (deps, handler) => Promise.all(deps.map(dep => {
  // 如果是相对路径，或者 CDN  有。
  if (globalOptions.paths[dep]) return __import(globalOptions.paths[dep])
  return __load(__getUrl(dep)).then(() => {
    const { deps, handler } = globalDeps[dep]
    if (deps.length === 0) return handler()
    return require(deps, handler)
  })
})).then(arr => handler(...arr))

require.config = options => Object.assign(globalOptions, options)

// window.require = require
