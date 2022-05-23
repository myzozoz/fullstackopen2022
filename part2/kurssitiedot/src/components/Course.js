const SubHeader = ({title}) => <h2>{title}</h2>

const Part = ({name, exercises}) => <p>{name} {exercises}</p>

const Content = ({parts}) => <div>
    {parts.map(p => <Part key={p.id} {...p}/>)}
  </div>

const Total = ({parts}) => <p>Number of exercises {parts.reduce((prev, curr) => prev+curr.exercises, 0)}</p>

const Course = ({course}) => 
  <div>
    <SubHeader title={course.name}/>
    <Content parts={course.parts}/>
    {<Total parts={course.parts}/>}
  </div>

export default Course