const Header = ({course}) => <h1>{course}</h1>

const Part = ({name, exercises}) => <p>
    {name} {exercises}
  </p>

const Content = ({parts}) => <div>
      {parts.map(p => <Part key={p.id} {...p}/>)}
    </div>

const Total = ({parts}) => <p>Number of exercises {parts.reduce((prev, curr) => prev+curr.exercises, 0)}</p>

const Course = ({course}) => <div>
    <Header course={course.name}/>
    <Content parts={course.parts}/>
    {/*<Total parts={course.parts}/>*/}
  </div>

const App = () => {
  const course = {
    name: 'Half Stack application development',
    id: 1,
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
      }
    ]
  }

  return (
    <Course course={course}/>
  )
}

export default App