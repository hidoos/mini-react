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
  while(!shouldYield && nextUnitOfWork) {
    // 执行完当前任务，需要返回下一个任务
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork)
    shouldYield = deadline.timeRemaining() < 1
  }
  requestIdleCallback(workLoop)
}


function createDom(type) {
  return type === 'TEXT_ELEMENT'
    ? document.createTextNode('')
    : document.createElement(type)
}

function initChildren(work) {
  const children = work.props.children
  let prevChild = null
  children.forEach((child, index) => {
    const newUnitOfWork = {
      type: child.type,
      props: child.props,
      child: null,
      parent: work,
      sibling: null,
      dom: null
    }
    if (index === 0) {
      work.child = newUnitOfWork
    } else {
      prevChild.sibling = newUnitOfWork
    }
    prevChild = newUnitOfWork
  })
}

function updateProps(work, dom) {
  Object.keys(work.props).forEach(key => {
    if (key !== 'children') {
      dom[key] = work.props[key]
    }
  })
}

function performUnitOfWork(work) {
  if(!work.dom) {
    const dom = (work.dom = createDom(work.type))
    // 2 处理 props
    // // 设置 props
    updateProps(work, dom)
    work.parent.dom.append(dom)
  }
  // 3 转换tree为链表，设置好指针
  initChildren(work)

  // 4 返回下一个要执行的任务
  if(work.child) {
    return work.child
  }
  if(work.sibling ) {
    return work.sibling
  }
  return work.parent?.sibling
}


const render = (el, container) => {
  nextUnitOfWork = {
    dom: container,
    props: {
      children: [el]
    }
  }
}

requestIdleCallback(workLoop)

const React = {
  createElement,
  render
}

export default React


