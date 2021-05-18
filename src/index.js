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

// const myVnode = h('h1', {}, '你好')
const myVnode = h('ul', {}, [
  h('li', {}, 'A'),
  h('li', {}, 'B'),
  h('li', {}, [
    h('p', {}, 'C'),
    h('p', {}, 'D'),
  ])
])


const container = document.getElementById('container')
const btn = document.getElementById('btn')
patch(container, myVnode)

const myVnode2 = h('div', {}, [
  h('p', {}, '1'),
  h('p', {}, '2')
])

btn.onclick = function () {
  patch(myVnode, myVnode2)
}
// console.log(myVnode);