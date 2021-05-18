import vnode from './vnode.js'
import createElement from './createElement.js'

export default function (oldVnode, newVnode) {
  // 1.判断传入的第一个参数，是DOM节点还是vnode
  if (oldVnode.sel === '' || oldVnode.sel === undefined) {
    oldVnode = vnode(oldVnode.tagName.toLowerCase(), {}, [], undefined, oldVnode);
  }

  // 2.判断oldVnode和newVnode是不是同一个节点
  if (oldVnode.sel === newVnode.sel && oldVnode.key === newVnode.key) {
    console.log('是同一个节点');
  } else {
  // 3.不是同一个节点，暴力插入新的，删除旧的
    console.log('不是同一个节点');
    createElement(newVnode, oldVnode.elm)
  }

}