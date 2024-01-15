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

let newFiber = null
function workLoop(deadline) {
  let shouldYield = false
  while(!shouldYield && newFiber) {
    // 执行完当前任务，需要返回下一个任务
    newFiber = performUnitOfWork(newFiber)
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
    const newFiber = {
      type: child.type,
      props: child.props,
      child: null,
      parent: work,
      sibling: null,
      dom: null
    }
    if (index === 0) {
      work.child = newFiber
    } else {
      prevChild.sibling = newFiber
    }
    prevChild = newFiber
  })
}

function updateProps(props, dom) {
  Object.keys(props).forEach(key => {
    if (key !== 'children') {
      dom[key] = props[key]
    }
  })
}

function performUnitOfWork(fiber) {
  if(!fiber.dom) {
    const dom = (fiber.dom = createDom(fiber.type))
    // 2 处理 props
    // // 设置 props
    updateProps(fiber.props, dom)
    fiber.parent.dom.append(dom)
  }
  // 3 转换tree为链表，设置好指针
  initChildren(fiber)

  // 4 返回下一个要执行的任务
  if(fiber.child) {
    return fiber.child
  }
  if(fiber.sibling ) {
    return fiber.sibling
  }
  return fiber.parent?.sibling
}


const render = (el, container) => {
  newFiber = {
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


