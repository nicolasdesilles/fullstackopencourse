import { useState } from 'react'

// Button Component
const Button = ({onClick, text}) => {
  return (
    <button onClick={onClick}>{text}</button>
  )
}

// Anecdote Component
const Anecdote = ({anecdotes, index, votes}) => {
  return (
    <div>
      <p>{anecdotes[index]}</p>
      <p>Has {votes[index]} votes</p>
    </div>
  )
}

// Top Anecdote Component
const TopAnecdote = ({anecdotes, votes}) => {

  //Helper Function to find the index of the max value in an array
  const maxIndexOfArray = (array) => {

    if (array.length === 0) {
      return -1;
    }
    else {

      var maxValue = array[0];
      var maxIndex = 0

      for (var i = 1; i < array.length; i++) {
        if (array[i] > maxValue) {
            maxIndex = i;
            maxValue = array[i];
        }
      }

      return maxIndex

    }

  }

  var maxIndex = maxIndexOfArray(votes)

  if (maxIndex === 0 && votes[0] === 0) {
    return (
      <div>
        <p>No votes yet.</p>
      </div>
    )
  }
  else {
    return (
      <div>
        <p>{anecdotes[maxIndex]}</p>
        <p>Has {votes[maxIndex]} votes</p>
      </div>
    )
  }
  
}

const App = () => {

  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  // App States
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))

  // Utility Function: Random array index generator
  const generateRandomIndex = (array) => Math.floor(Math.random() * array.length)

  // Button Clicks Handler Functions
  const handleNextAnecdote = () => {
    setSelected(generateRandomIndex(anecdotes))
  }

  const handleVote = () => {
    var votesCopy = [...votes]
    votesCopy[selected] += 1
    setVotes(votesCopy)
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <Anecdote anecdotes={anecdotes} index={selected} votes={votes}/>
      <Button onClick={handleVote} text={"Vote"}/>
      <Button onClick={handleNextAnecdote} text={"Next Anecdote"}/>

      <h1>Anecdote with the most votes</h1>
      <TopAnecdote anecdotes={anecdotes} votes={votes}/>
    </div>
  )
}

export default App