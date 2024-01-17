import React from "./core/React"

function Counter ({num}) {
  return <div>counter{num}</div>
}

export const App = () => {
  function handleClick () {
    alert("click")
  }
  return (
    <div id='app'>
      hello app
      <Counter num={10} />
      <Counter num={12} />
      <button onClick={handleClick}>click</button>
    </div>
  )
}