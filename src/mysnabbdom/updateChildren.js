import patch from './patch.js';
import patchVnode from './patchVnode.js'
import createElement from './createElement.js';

function checkSameVnode(a, b) {
  return a.sel === b.sel && a.key === b.key;
}

export default function updateChildren(parentElm, oldCh, newCh) {
  console.log(oldCh, newCh);
  // 旧前
  let oldStartIdx = 0;
  // 旧前节点
  let oldStartVnode = oldCh[0];
  // 新前
  let newStartIdx = 0;
  // 新前节点
  let newStartVnode = newCh[0];
  // 旧后
  let oldEndIdx = oldCh.length - 1;
  // 旧后节点
  let oldEndVnode = oldCh[oldEndIdx];
  // 新后
  let newEndIdx = newCh.length - 1;
  // 新后节点
  let newEndVnode = newCh[newEndIdx];
  
  while(newStartIdx <= newEndIdx && oldStartIdx <= oldEndIdx) {
    console.log('☆');
    // 1. 新前和旧前
    if (checkSameVnode(oldStartVnode, newStartVnode)) {
      console.log('1. 新前和旧前');
      patchVnode(oldStartVnode, newStartVnode)
      oldStartVnode = oldCh[++oldStartIdx]
      newStartVnode = newCh[++newStartIdx]
    } else if (checkSameVnode(oldEndVnode, newEndVnode)) {
    // 2. 新后和旧后
      console.log('2. 新后和旧后');
      patchVnode(oldEndVnode, newEndVnode)
      oldEndVnode = oldCh[--oldEndIdx]
      newEndVnode = newCh[--newEndIdx]
    } else if (checkSameVnode(newEndVnode, oldStartVnode)) {
    // 3. 新后与旧前
      console.log('3. 新后与旧前');
      patchVnode(oldStartVnode, newEndVnode)
      // 将新后指向的节点，移动到旧后之后

      parentElm.insertBefore(oldStartVnode.elm, oldEndVnode.elm.nextSibling)

      newEndVnode = newCh[--newEndIdx]
      oldStartVnode = oldCh[++oldStartIdx]
    } else if (checkSameVnode(newStartVnode, oldEndVnode)) {
    // 4. 新前和旧后
      console.log('4. 新前和旧后');
      patchVnode(oldEndVnode, newStartVnode)

      parentElm.insertBefore(oldEndVnode.elm, oldStartVnode.elm)

      oldEndVnode = oldCh[--oldEndIdx]
      newStartVnode = newCh[++newStartIdx]
    } else {
    // 5. 都没有找到
    }
  }
  // 继续看看有没有剩余的。循环结束了start还是比old小
  if(newStartIdx <= newEndIdx) {
    console.log('new还剩一些');
    const before = newCh[newEndIdx + 1] == null ? null : newCh[newEndIdx + 1].elm
    // console.log(before);
    for(let i = newStartIdx; i <= newEndIdx; i++) {
      // brefore为null时, insertBefore等于appendChild
      parentElm.insertBefore(createElement(newCh[i]), before)
    }
  } else if (oldStartIdx <= oldEndIdx) {
    console.log('old还剩一些');
    for (let i = oldStartIdx; i <= oldEndIdx; i++) {
      parentElm.removeChild(oldCh[i].elm)
    }
  }




}


