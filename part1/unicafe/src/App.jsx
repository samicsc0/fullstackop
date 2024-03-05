import { useState } from 'react'

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const increaseGood = () => setGood(good + 1)
  const increaseNeutral = () => setNeutral(neutral + 1)
  const increaseBad = () => setBad(bad + 1)
  const getTotal = () => good + neutral + bad
  const getAverage = ()=> getTotal() / 3

  return (
    <div>
      <h1>give feedback</h1>
      <button onClick={()=>increaseGood()}>good</button>
      <button onClick={()=>increaseNeutral()}>neutral</button>
      <button onClick={()=>increaseBad()}>bad</button>
      <h1>statistics</h1>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <p>total {good + neutral + bad}</p>
      <p>average {(good + neutral + bad) / 3}</p>
      <p>positive: { ((good + neutral) * 100 ) / getTotal()}</p>
    </div>
  )
}

export default App