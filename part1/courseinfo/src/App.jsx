const Header = (props) => {
  return (
    <div>
      <h1>{props.course}</h1>
    </div>
  )
}

const Content = (props) => {
  return (
    <div>
      <p>{props.partTitles[0]} {props.numExercises[0]}</p>
      <p>{props.partTitles[1]} {props.numExercises[1]}</p>
      <p>{props.partTitles[2]} {props.numExercises[2]}</p>
    </div>
  )
}

const Total = (props) => {
  return (
    <div>
      <p>Total Number of exercises: {props.totalNumExercises}</p>
    </div>
  )
}


const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Header course={course}/>
      <Content partTitles={[part1, part2, part3]} numExercises={[exercises1, exercises2, exercises3]} />
      <Total totalNumExercises={exercises1 + exercises2 + exercises3} />
    </div>
  )
}

export default App