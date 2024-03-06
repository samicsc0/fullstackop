import { useState } from 'react'
import Statistics from './components/Statistics'
import Button from './components/Button'

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const increaseGood = () => setGood(good + 1)
  const increaseNeutral = () => setNeutral(neutral + 1)
  const increaseBad = () => setBad(bad + 1)
  const getTotal = () => good + neutral + bad
  const getAverage = () => getTotal() / 3

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={increaseGood} buttonName={"good"} />
      <Button onClick={increaseNeutral} buttonName={"neutral"} />
      <Button onClick={increaseBad} buttonName={"bad"} />
      <h1>statistics</h1>
      {getTotal() ? <Statistics good={good} neutral={neutral} bad={bad} getAverage={getAverage} getTotal={getTotal} /> : <p>No feedback given</p>}
    </div>
  )
}

export default App