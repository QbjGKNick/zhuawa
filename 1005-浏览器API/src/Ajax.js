
function formatUrl(json) {
  let dataArr = []
  json.t = Math.random()
  for(let key in json) {
    dataArr.push(`${key}=${encodeURIComponent(json[key])}`)
  }
  return dataArr.join('&')
}

function ajax(options) {
  return new Promise((resolve,reject) => {
    if(!(options && options.url)) return

    options.type = options.type || 'GET'
    options.data = options.data || {}
    options.timeout = options.timeout || 10000

    let dataToUrlStr = formatUrl(options.data)
    let timer

    let xhr = new XMLHttpRequest()

    if (options.type.toUpperCase() === 'GET') {
      xhr.open('get', `${options.url}?${dataToUrlStr}`, true)
      xhr.send()
    } else if (options.type.toUpperCase() === 'POST') {
      xhr.open('post', options.url, true)
      xhr.send(options.data)
    }

    xhr.onreadystatechange = function() {
      if(xhr.readyState !== 4) return
      clearTimeout(timer)
      if (xhr.status >= 200 && xhr.status < 300 || xhr.status === 304) {
        resolve(xhr.responseText)
      } else {
        reject(xhr.status)
      }
    }

    if (options.timeout) {
      timer = setTimeout(() => {
        xhr.abort()
        reject('timeout')
      }, options.timeout)
    }
  })
}

// Ajax 和 fetch
let xhr = new XMLHttpRequest()

xhr.open('GET', 'http://www.baidu.com/api/v1/xx')

// 0 请求未初始化
// 1 请求已建立
// 2 请求已经发送
// 3 请求在处理
// 4 响应已经完成

xhr.onreadystatechange = function() {
  if (xhr.readyState !== 4) return
  if (xhr.status === 200) {
    console.log(xhr.responseText)
  } else {
    // error
    console.error('http error', xhr.status, xhr.statusText)
  }
}

// 一定在最后
xhr.send()


fetch(
  'http://www.baidu.com/api/v1/xx', {
    method: 'GET',
    credentials: 'same-origin'
  }
).then(res => {
  if (res.status === 200) {
    return res.json()
  }
  throw new Error('error')
})
.then(json => console.log(json))
.catch(err => console.error(err))