import createElement from './createElement.js'
import updateChildren from './updateChildren.js'

// 对比同一个虚拟节点
export default function patchVnode(oldVnode, newVnode) {
  // ① 判断oldVnode和newVnode是不是内存中同一个
  if (oldVnode === newVnode) return
  // ② 判断newVnode有没有text属性

  // newVnode有text属性
  if(newVnode.text !== undefined && (newVnode.children === undefined || newVnode.children.length === 0)) {
    if (newVnode.text !== oldVnode.text) {
      oldVnode.elm.innerText = newVnode.text
    }
  } else {
  // newVnode没有text属性

  // ③ oldVnode有没有children
  // 没有children
    if (oldVnode.children === undefined || oldVnode.children.length === 0) {
      oldVnode.elm.innerText = ''
      oldVnode.text = ''
      oldVnode.children = []
      newVnode.children.forEach((child) => {
        let childDom = createElement(child)
        oldVnode.elm.appendChild(childDom)  
        oldVnode.children.push(child)
      })
    } else {
      // 新老都有children，此时是最复杂的情况
      updateChildren(oldVnode.elm, oldVnode.children, newVnode.children)
    }
  }
}