const Header = ({course}) => <h1>{course}</h1>

const Part = ({name, exercises}) => <p>
    {name} {exercises}
  </p>

const Content = ({parts}) => <div>
      {parts.map((p,i) => <Part key={i} {...p}/>)}
    </div>

const Total = ({total}) => <p>Number of exercises {total}</p>

const App = () => {
  const course = 'Half Stack application development'
  const parts = [
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

  return (
    <div>
      <Header course={course}/>
      <Content parts={parts}/>
      <Total total={parts.reduce((prev, curr) => prev+curr.exercises, 0)}/>
    </div>
  )
}

export default App