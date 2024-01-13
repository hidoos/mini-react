const entryEl = document.getElementById("root")

// v0 - vdom -
// 描述vdom 的数据结构
// 使用数据结构的函数

createElement = () => {
  const el = document.createElement('div')
  el.id = "app"
  el.textContent = "App"
  return el
}

entryEl.append(createElement())
