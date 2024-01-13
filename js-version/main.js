import React from "./core/React.js"
import ReactDom from "./core/ReactDom.js"
// 使用 type 类型的不同去拆分

// 使用 native dom 来渲染创建好的数据结构

const container = document.getElementById("root")
const App = React.createElement('div', {id: 'app'}, 'helloApp', '-man')
console.log("App", App)

ReactDom(container).render(App)
