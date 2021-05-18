// 真正创建节点。将vnode创建为DOM，插入到pivot之前
export default function (vnode, pivot) {
  // console.log(vnode, pivot);
  let domNode = document.createElement(vnode.sel)
  // 有子节点or文本？？两个不共存
  if(vnode.text !== '' && (vnode.children === undefined || vnode.children.length === 0)) {
    // 内部是文本
    domNode.innerText = vnode.text 
    pivot.parentNode.insertBefore(domNode, pivot)
    // pivot.parentNode.removeChild(pivot)
  } else if (Array.isArray(vnode.children) && vnode.children.length > 0) {
    // 内部是子节点
    // console.log('hello');
    console.log(vnode.children);
  }
}