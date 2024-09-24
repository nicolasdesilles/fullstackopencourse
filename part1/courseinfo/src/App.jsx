const Header = (props) => {
  return (
    <div>
      <h1>{props.course}</h1>
    </div>
  )
}

const Part = (props) => {
  return (
    <div>
      <p>{props.partTitle} {props.partNumEx}</p>
    </div>
  )
}

const Content = (props) => {
  return (
    <div>
      <Part partTitle={props.partTitles[0]} partNumEx={props.numExercises[0]} />
      <Part partTitle={props.partTitles[1]} partNumEx={props.numExercises[1]} />
      <Part partTitle={props.partTitles[2]} partNumEx={props.numExercises[2]} />
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