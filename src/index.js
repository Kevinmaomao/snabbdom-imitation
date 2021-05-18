import h from './mysnabbdom/h.js'
import patch from './mysnabbdom/patch.js'

// h('div', {}, '文字')
// h('div', {}, [])
// h('div', {}, h())
// var myVnode = h('div', {}, [
//   h('p', {}, '哈哈'),
//   h('p', {}, '嘻嘻'),
//   h('p', {}, [
//     h('p', {}, 'abc')
//   ])
// ])

const myVnode = h('h1', {}, '你好')

const container = document.getElementById('container')

patch(container, myVnode)
// console.log(myVnode);