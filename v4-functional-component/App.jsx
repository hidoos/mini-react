import React from "./core/React"

function Counter () {
  return <div>counter</div>
}

function CounterContainer () {
  return <Counter />
}

export const App = () => {
  return (
    <div id='app'>
      hello app
      <CounterContainer />
    </div>
  )
}