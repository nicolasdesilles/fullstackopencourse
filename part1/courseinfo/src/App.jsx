const Header = (props) => {
  console.log(props.course.name)
  return (
    <div>
      <h1>{props.course.name}</h1>
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
      <Part partTitle={props.parts[0].name} partNumEx={props.parts[0].exercises}  />
      <Part partTitle={props.parts[1].name} partNumEx={props.parts[1].exercises}  />
      <Part partTitle={props.parts[2].name} partNumEx={props.parts[2].exercises}  />
    </div>
  )

  return completeContent
}

const Total = (props) => {
  let total = 0
  props.parts.forEach(part => {
    total += part.exercises}
  )
  return (
    <div>
      <p>Total Number of exercises: {total}</p>
    </div>
  )
}


const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course}/>
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default App