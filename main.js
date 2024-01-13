// 使用 type 类型的不同去拆分

const createTextNode = (text) => {
  return {
    type: 'TEXT_ELEMENT',
    props: {
      nodeValue: text,
      children: []
    }
  }
}

const element = {
}

const createElement = (type, props,...children) => {
  return {
    type,
    props: {
      ...props,
      children
    }
  }
}



// 使用 native dom 来渲染创建好的数据结构


const render = (el, container) => {
  // 创建元素的type
  const dom = el.type === 'TEXT_ELEMENT' ? document.createTextNode(''): document.createElement(el.type)
  Object.keys(el.props).forEach(key => {
    if(key !== 'children') {
      dom[key] = el.props[key]
    }
  })
  const children = el.props.children
  children.forEach((child) => {
    render(child, dom)
  })
  container.append(dom)
}

const container = document.getElementById("root")
const App = createElement('div', {id: 'app'}, createTextNode('hello App'))
console.log("App", App)
render(App, container)
