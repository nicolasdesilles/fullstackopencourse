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
  const [history, setHistory] = useState([])

  const handleGood = () => {
    setHistory(history.concat(1))
    setGood(good + 1)
  }

  const handleNeutral = () => {
    setHistory(history.concat(0))
    setNeutral(neutral + 1)
  }

  const handleBad = () => {
    setHistory(history.concat(-1))
    setBad(bad + 1)
  }

  const computeAverage = () => {
    if (history.length === 0) {
      return 0
    } 

    let total = 0
    for (let index = 0; index < history.length; index++) {
      total += history[index]
    }
    return (total / history.length)
  }

  const computePositive = () => {

    if (history.length === 0) {
      return '0 %'
    } 

    let positiveCount = 0
    for (let index = 0; index < history.length; index++) {
      if (history[index] > 0) {
        positiveCount++
      }
    }
    return ((positiveCount / history.length)*100).toString().concat(' %')

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
      <Display label={'All'} value={good + neutral + bad}/>
      <Display label={'Average'} value={computeAverage()}/>
      <Display label={'Positive'} value={computePositive()}/>
    </div>
  )
}

export default App
