// 真正创建节点。将vnode创建为DOM，插入到pivot之前
export default function createElement(vnode) {
  // console.log(vnode, pivot);
  let domNode = document.createElement(vnode.sel)
  // 有子节点or文本？？（两个不共存）
  if(vnode.text !== '' && (vnode.children === undefined || vnode.children.length === 0)) {
    // 内部是文本
    domNode.innerText = vnode.text 
   
  } else if (Array.isArray(vnode.children) && vnode.children.length > 0) {
    // 内部是子节点
    // console.log(vnode.children);

    vnode.children.forEach(child => {
      let childDom = createElement(child)
      domNode.appendChild(childDom);
    })
  }
   // 补充elm属性
   vnode.elm = domNode
  // 返回elm，elm是纯DOM对象
  return vnode.elm
}