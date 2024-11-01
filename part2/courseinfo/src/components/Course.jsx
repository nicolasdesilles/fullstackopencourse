const Header = ({course}) => {
    return (
      <div>
        <h2>Course: {course.name}</h2>
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
          // console.log('Adding exercice number for part:', currentPart.name)
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

  export default Course