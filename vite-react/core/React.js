const createTextNode = (text) => {
  return {
    type: 'TEXT_ELEMENT',
    props: {
      nodeValue: text,
      children: []
    }
  }
}

const createElement = (type, props,...children) => {
  return {
    type,
    props: {
      ...props,
      children: children.map(child => {
        return typeof child === 'string' ? createTextNode(child): createElement(child)
      })
    }
  }
}


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

const React = {
  createElement,
  render
}

export default React