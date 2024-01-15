import React from "./core/React"
import ReactDom from "./core/ReactDom"
import { App } from "./App"
// 使用 type 类型的不同去拆分

// 使用 native dom 来渲染创建好的数据结构

const container = document.getElementById("root")
console.log("App", App)

ReactDom(container).render(App)
