const Header = ({title}) => <h1>{title}</h1>

const SubHeader = ({title}) => <h2>{title}</h2>

const Part = ({name, exercises}) => <p>
    {name} {exercises}
  </p>

const Content = ({parts}) => <div>
      {parts.map(p => <Part key={p.id} {...p}/>)}
    </div>

const Total = ({parts}) => <p>Number of exercises {parts.reduce((prev, curr) => prev+curr.exercises, 0)}</p>

const Course = ({course}) => {
  console.log(course)
  return (
    <div>
      <SubHeader title={course.name}/>
      <Content parts={course.parts}/>
      {<Total parts={course.parts}/>}
    </div>
    )
}

const App = () => {
  const courses = [
    {
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
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <div>
      <Header title={'Web development curriculum'}/>
      {courses.map(c => <Course key={c.id} course={c}/>)}
    </div>
  )
}

export default App