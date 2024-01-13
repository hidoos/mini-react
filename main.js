// v0 - vdom - 渲染 vdom
// 描述vdom 的数据结构
// 使用数据结构的函数


// 构建 vdom 的数据结构
// 产生了两个问题
// 对于 children 的，是创建子元素，还是创建文本节点，应该使用什么来判断
const createElement = (type, props, ...children) => {
  return {
    type,
    props: {
      ...props,
      children 
    },
  }  
}


// 使用 native dom 来渲染创建好的数据结构

const render = () => {
  const el = document.createElement(type)
  el.id = props.id
  el.textContent = text
  return el
}

const entryEl = document.getElementById("root")
entryEl.append(createElement('div', {id: 'app'}, 'App'))
