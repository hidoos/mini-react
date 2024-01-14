const createTextNode = (text) => {
  return {
    type: 'TEXT_ELEMENT',
    props: {
      nodeValue: text,
      children: []
    }
  }
}

const createElement = (type, props, ...children) => {
  return {
    type,
    props: {
      ...props,
      children: children.map(child => {
        return typeof child === 'string' ? createTextNode(child): child
      })
    }
  }
}

let nextUnitOfWork = null
function workLoop(deadline) {
  let shouldYield = false
  while(!shouldYield) {
    // 执行完当前任务，需要返回下一个任务
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork)
    shouldYield = deadline.timeRemaining() < 1
  }
  requestIdleCallback(workLoop)
}

function performUnitOfWork(work) {
  // 1 创建dom
  work.dom = el.type === 'TEXT_ELEMENT' ? document.createTextNode(''): document.createElement(el.type)
  const dom = work.dom
  // 2 处理 props
  // // 设置 props
  Object.keys(el.props).forEach(key => {
    if(key !== 'children') {
      dom[key] = el.props[key]
    }
  })
  // 3 转换tree为链表，设置好指针
  // 4 返回下一个要执行的任务
}


const render = (el, container) => {
  nextUnitOfWork = {

  }




  // // 创建 children，递归渲染
  // const children = el.props.children
  // children.forEach((child) => {
  //   render(child, dom)
  // })
  // container.append(dom)
}

requestIdleCallback(workLoop)

const React = {
  createElement,
  render
}

export default React