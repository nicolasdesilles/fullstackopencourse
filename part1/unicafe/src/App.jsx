import { useState } from 'react'

// Button Component
const Button = ({onClick, text}) => {
  return (
    <button onClick={onClick}>{text}</button>
  )
}

// Statistic Line Component (previously called Display in Exercise 1.9)
const StatisticLine = ({label, value}) => {
  return (
    <div>{label} {value}</div>
  )
}

// Statistics Component
const Statistics = (props) => {

  // Extracting the props values
  const {good, neutral, bad, history} = props

  // Helper function to calculate the average feedback using the history of feedbacks
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

  // Helper function to calculate the percentage of positive feedback using the history of feedbacks
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

  // JSX HTML to render : we only display statistics if the 'history' array is not empty
  if (history.length === 0) {
    return (
      <div>No feedback given</div>
    )
  } 
  else {
    return (
      <div>
        <StatisticLine label={'Good'} value={good}/>
        <StatisticLine label={'Neutral'} value={neutral}/>
        <StatisticLine label={'Bad'} value={bad}/>
        <StatisticLine label={'All'} value={good + neutral + bad}/>
        <StatisticLine label={'Average'} value={computeAverage()}/>
        <StatisticLine label={'Positive'} value={computePositive()}/>
      </div>
    )
  } 
  
}

const App = () => {

  // App States
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [history, setHistory] = useState([])

  // Button Clicks Handler Functions
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

  // JSX HTML to render
  return (
    <div>
      <h1>Give Feedback</h1>
      <Button onClick={handleGood} text={'Good'} />
      <Button onClick={handleNeutral} text={'Neutral'} />
      <Button onClick={handleBad} text={'Bad'} />
      <h1>Statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} history={history}/>
    </div>
  )
}

export default App
