const attr = 'clickoutside' + new Date().valueOf()
const nodeList = []
let id = 0

const addEvent = (function () {
  if (document.addEventListener) {
    return function(el, event, handler) {
      if (el && event && handler) {
        el.addEventListener(event, handler, false)
      }
    }
  } else if (document.attachEvent) {
    return function(el, event, handler) {
      if (el && event && handler) {
        el.attachEvent('on' + event, handler)
      }
    }
  }
})()

addEvent(document, 'click', (e) => {
  nodeList.forEach(item => {
    if (item.el.contains(e.target)) return
    item.vnode.context[item.binding.expression]()
  })
})

/*
* 点击元素外面触发事件
*/
export default {
  bind (el, binding, vnode) {
    el[attr] = ++id
    nodeList.push({
      el,
      binding,
      vnode
    })
  },

  unbind (el, binding, vnode) {
    for (let i = 0; i < nodeList.length; i++) {
      if (nodeList[i].el.attr === el.attr) {
        nodeList.splice(i, 1)
        break
      }
    }
  }
}