import React from "./React.js"

const ReactDom = (container) => {
  return {
    render: (App) => {
      React.render(App, container)
    }
  }
}

export default ReactDom