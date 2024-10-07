import { useState } from 'react'

const Button = ({onClick, text}) => {
  return (
    <button onClick={onClick}>{text}</button>
  )
}

const Display = ({label, value}) => {
  return (
    <div>{label} {value}</div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGood = () => {
    setGood(good + 1)
  }

  const handleNeutral = () => {
    setNeutral(neutral + 1)
  }

  const handleBad = () => {
    setBad(bad + 1)
  }

  return (
    <div>
      <h1>Give Feedback</h1>
      <Button onClick={handleGood} text={'Good'} />
      <Button onClick={handleNeutral} text={'Neutral'} />
      <Button onClick={handleBad} text={'Bad'} />
      <h1>Statistics</h1>
      <Display label={'Good'} value={good}/>
      <Display label={'Neutral'} value={neutral}/>
      <Display label={'Bad'} value={bad}/>
    </div>
  )
}

export default App
