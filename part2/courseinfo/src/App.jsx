const Header = ({course}) => {
  return (
    <div>
      <h1>{course.name}</h1>
    </div>
  )
}

const Part = ({partTitle, partNumEx}) => {
  return (
    <div>
      <p>{partTitle} {partNumEx}</p>
    </div>
  )
}

const Content = ({course}) => {

  const initTotalvalue = 0
  const totalNumEx = course.parts.reduce(
    (sum, currentPart) => 
      {
        console.log('Adding exercice number for part:', currentPart.name)
        return sum + currentPart.exercises
      },
    initTotalvalue
  )

  return (
    <div>
      {
        course.parts.map(part =>
          <Part key={part.id} partTitle={part.name} partNumEx={part.exercises}  />
        )
      }
      <p><strong>total of {totalNumEx} exercices</strong></p>
    </div>
  )
}

const Course = ({course}) => {
  return (
    <div>
      <Header course={course} />
      <Content course={course} />
    </div>
  )
}

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
      {
        name: 'Redux',
        exercises: 11,
        id: 4
      }
    ]
  }

  return <Course course={course} />
}

export default App