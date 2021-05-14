import h from './mysnabbdom/h.js'

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

var myVnode = h('div', {}, h('span', {}, '你好'))
console.log(myVnode);