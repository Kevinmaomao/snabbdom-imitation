import vnode from './vnode.js'

// h('div', {}, '文字')
// h('div', {}, [])
// h('div', {}, h())
export default function h(sel, data, c) {

  console.log(sel);
  if (arguments.length !== 3) {
    throw new Error('必须传3个参数')
  }
  // 检查c的类型
  let Ctype = typeof c
  if(Ctype === 'string' || Ctype === 'number') {
    return vnode(sel, data, undefined, c, undefined)
  } else if (Array.isArray(c)) {
    // h('div', {}, [
    //   h('div', {}, '哈哈'),
    //   h('div', {}, '嘻嘻')
    // ])
    c.forEach(item => {
      if(!(typeof item === 'object' && item.hasOwnProperty('sel'))) {
        throw new Error('传入的数组中，有项不是h函数')
      }
    })
    return vnode(sel, data, c, undefined, undefined);
  } else if (Ctype === 'object' && c.hasOwnProperty('sel')) {
    // h('div', {}, h())
    // 传入的c是惟一的children
    return vnode(sel, data, [c], undefined, undefined);
  } else {
    throw  new Error('c类型不对')
  }
}