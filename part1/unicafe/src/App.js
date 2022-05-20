import { useState } from 'react'

const Header = ({title}) => <h1>
  {title}
</h1>

const Statistics = ({good, neutral, bad}) => {
  const all = good + neutral + bad
  return (
    <div>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <p>all {all}</p>
      <p>average {all > 0 ? (good - bad) / all : 0}</p>
      <p>positive { all > 0 ? (good / all) * 100 : 0} %</p>
    </div>
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const all = good + neutral + bad
  return (
    <div>
      <Header title={'give feedback'}/>
      <button onClick={()=>setGood(good+1)}>good</button>
      <button onClick={()=>setNeutral(neutral+1)}>neutral</button>
      <button onClick={()=>setBad(bad+1)}>bad</button>
      <Header title={'statistics'}/>
      <Statistics good={good} neutral={neutral} bad={bad}/>

    </div>
  )
}

export default App