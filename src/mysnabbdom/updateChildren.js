import patch from './patch.js';
import patchVnode from './patchVnode.js'
import createElement from './createElement.js';

function checkSameVnode(a, b) {
  return a.sel === b.sel && a.key === b.key;
}

export default function updateChildren(parentElm, oldCh, newCh) {
  // console.log(oldCh, newCh);
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
  // 做缓存
  let keyMap = null;
  
  while(newStartIdx <= newEndIdx && oldStartIdx <= oldEndIdx) {
    console.log('☆');
    if (oldStartVnode == null) {
      oldStartVnode = oldCh[++oldStartIdx] // Vnode might have been moved left
    } else if (oldEndVnode == null) {
      oldEndVnode = oldCh[--oldEndIdx]
    } else if (newStartVnode == null) {
      newStartVnode = newCh[++newStartIdx]
    } else if (newEndVnode == null) {
      newEndVnode = newCh[--newEndIdx]
    } else if (checkSameVnode(oldStartVnode, newStartVnode)) {
    // 1. 新前和旧前
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
      console.log(parentElm);
    } else if (checkSameVnode(newStartVnode, oldEndVnode)) {
    // 4. 新前和旧后
      console.log('4. 新前和旧后');
      patchVnode(oldEndVnode, newStartVnode)

      parentElm.insertBefore(oldEndVnode.elm, oldStartVnode.elm)

      oldEndVnode = oldCh[--oldEndIdx]
      newStartVnode = newCh[++newStartIdx]
    } else {
    // 5. 都没有找到

    console.log('5.没有匹配');
      // 寻找key的map
      if (!keyMap) {
        keyMap = {}
        for(let i = oldStartIdx; i <= oldEndIdx; i++) {
          const key = oldCh[i].key
          if (key != undefined) {
            keyMap[key] = i
          }
        }
      }
      // 寻找当前这项（newStartIdx）在keyMap中的映射的位置序号
      const idxInOld = keyMap[newStartVnode.key]
      console.log('***',idxInOld);

      // 判断，如果idxInOld是undefined表示它是全新的项
      if (idxInOld == undefined) {
        // true

        // 被加入的项（就是newStartVnode这项）现在不是真正的DOM
        parentElm.insertBefore(createElement(newStartVnode), oldStartVnode.elm)

      } else {
        // false，则移动
        const elmToMove = oldCh[idxInOld];
        patchVnode(elmToMove, newStartVnode);
        // console.log(elmToMove);
        // 把这项设置为undefined，表示我已经处理完这项了
        oldCh[idxInOld] = undefined;
        // 移动，调用insertBefore也可以实现移动
        parentElm.insertBefore(elmToMove.elm, oldStartVnode.elm)
      }
      // 只移新的头
      newStartVnode = newCh[++newStartIdx]
    }
  }
  // 继续看看有没有剩余的。循环结束了start还是比old小
  if(newStartIdx <= newEndIdx) {
    console.log('new还剩一些');
    // const before = newCh[newEndIdx + 1] == null ? null :  newCh[newEndIdx + 1].elm

    // const before = newCh[newEndIdx + 1] == null ? null :  createElement(newCh[newEndIdx + 1])
    console.log('before', newCh[newEndIdx + 1]);
    for(let i = newStartIdx; i <= newEndIdx; i++) {
      // brefore为null时, insertBefore等于appendChild
      parentElm.insertBefore(createElement(newCh[i]), oldCh[oldStartIdx].elm)
    }
  } else if (oldStartIdx <= oldEndIdx) {
    console.log('old还剩一些');
    for (let i = oldStartIdx; i <= oldEndIdx; i++) {
      if(oldCh[i]) {
        parentElm.removeChild(oldCh[i].elm)
      }
    }
  }
}


