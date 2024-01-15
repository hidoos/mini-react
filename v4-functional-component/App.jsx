import React from "./core/React"

function Counter ({num}) {
  return <div>counter{num}</div>
}


export const App = () => {
  return (
    <div id='app'>
      hello app
      <Counter num={10} />
    </div>
  )
}