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

// const myVnode = h('section', {}, 'abc');

// const myVnode = h('section', {}, [
//   h('p', {}, '1'),
//   h('p', {}, '2'),
//   h('p', {}, '3')
// ])
const vnode1 = h('ul', {}, [
  h('li', {key: 'A'}, 'A'),
  h('li', {key: 'B'}, 'B'),
  h('li', {key: 'D'}, 'D')
])

const container = document.getElementById('container')
const btn = document.getElementById('btn')
patch(container, vnode1)

// const myVnode2 = h('section', {}, [
//   h('p', {}, '1'),
//   h('p', {}, '2'),
//   h('p', {}, '3')
// ])
// const myVnode2 = h('section', {}, '你好')
const vnode2 = h('ul', {}, [
  h('li', {key: 'A'}, 'A'),
  h('li', {key: 'C'}, 'C'),
  h('li', {key: 'D'}, 'D'),
  h('li', {key: 'B'}, 'B'),
  h('li', {key: 'E'}, 'E'),

])

btn.onclick = function () {
  patch(vnode1, vnode2)
}
// console.log(myVnode);