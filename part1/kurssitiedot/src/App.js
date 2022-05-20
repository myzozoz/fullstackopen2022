const Header = ({course}) => <h1>{course}</h1>

const Part = ({name, exercises}) => <p>
    {name} {exercises}
  </p>

const Content = ({parts}) => <div>
      {parts.map((p,i) => <Part key={i} {...p}/>)}
    </div>

const Total = ({parts}) => <p>Number of exercises {parts.reduce((prev, curr) => prev+curr.exercises, 0)}</p>

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
      <Header course={course.name}/>
      <Content parts={course.parts}/>
      <Total parts={course.parts}/>
    </div>
  )
}

export default App