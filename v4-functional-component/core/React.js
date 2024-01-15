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
        console.log(child) // 会发现这里 child 直接输入 10 了, 应该想办法把这里当作一个文本节点来处理
        const isTextNode = typeof child === 'string' || typeof child === 'number'
        return isTextNode ? createTextNode(child) : child
      })
    }
  }
}

let root = null
let nextUnitOfWork = null
function workLoop(deadline) {
  let shouldYield = false
  while (!shouldYield && nextUnitOfWork) {
    // 执行完当前任务，需要返回下一个任务
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork)
    shouldYield = deadline.timeRemaining() < 1
  }

  if (!nextUnitOfWork && root) {
    // 1. 当前链表已经处理完
    commitRoot()
  }

  requestIdleCallback(workLoop)
}

function commitRoot() {
  commitWork(root.child)
  root = null
}

function commitWork(fiber) {
  if (!fiber) return

  // 这里因为 counter 是一个函数组件，本身并不是work单元，没有fiber相关的dom，他直接返回的就是一个 vdom
  // 所以在这里通过向上查找的方式，通过parent并且有dom的情况来 append
  let fiberParent = fiber.parent

  // 通过white来一直向上查找，处理函数组件嵌套的情况
  while (!fiberParent.dom) {
    fiberParent = fiberParent.parent
  }

  // counter 函数组件 fiber，没有 dom，需要检测一下
  if (fiber.dom) {
    fiberParent.dom.append(fiber.dom)
  }

  commitWork(fiber.child)
  commitWork(fiber.sibling)
}


function createDom(type) {
  // console.log('type', type); 
  return type === 'TEXT_ELEMENT'
    ? document.createTextNode('')
    : document.createElement(type)
}

function initChildren(fiber, children) {
  let prevChild = null
  children.forEach((child, index) => {
    const newFiber = {
      type: child.type,
      props: child.props,
      child: null,
      parent: fiber,
      sibling: null,
      dom: null
    }
    if (index === 0) {
      fiber.child = newFiber
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

function updateFunctionComponent(fiber) {
  const children = [fiber.type(fiber.props)]
  // 3 转换tree为链表，设置好指针
  initChildren(fiber, children)
}

function updateHostComponent(fiber) {
  if (!fiber.dom) {
    const dom = (fiber.dom = createDom(fiber.type))
    updateProps(fiber.props, dom)
  }
  const children = fiber.props.children
  // 3 转换tree为链表，设置好指针
  initChildren(fiber, children)
}

function performUnitOfWork(fiber) {
  const isFunctionComponent = typeof fiber.type === 'function'

  if (!isFunctionComponent) {
    updateHostComponent(fiber)
  } else {
    updateFunctionComponent(fiber)
  }

  const children = isFunctionComponent ? [fiber.type(fiber.props)] : fiber.props.children
  // 3 转换tree为链表，设置好指针
  initChildren(fiber, children)

  // 4 返回下一个要执行的任务
  if (fiber.child) {
    return fiber.child
  }
  if (fiber.sibling) {
    return fiber.sibling
  }

  let nextFiber = fiber
  while (nextFiber) {
    if (nextFiber.sibling) return nextFiber.sibling
    nextFiber = nextFiber.parent
  }
}


const render = (el, container) => {
  nextUnitOfWork = {
    dom: container,
    props: {
      children: [el]
    }
  }

  root = nextUnitOfWork
}

requestIdleCallback(workLoop)

const React = {
  createElement,
  render
}

export default React


