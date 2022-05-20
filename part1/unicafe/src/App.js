import { useState } from 'react'

const Header = ({title}) => <h1>
  {title}
</h1>

const StatisticLine = ({text, value}) => <p>{text} {value}</p>

const Statistics = ({good, neutral, bad}) => {
  const all = good + neutral + bad
  
  return all > 0 ?  (
    <div>
      <StatisticLine text={'good'} value={good}/>
      <StatisticLine text={'neutral'} value={neutral}/>
      <StatisticLine text={'bad'} value={bad}/>
      <StatisticLine text={'all'} value={all}/>
      <StatisticLine text={'average'} value={all > 0 ? (good - bad) / all : 0}/>
      <StatisticLine text={'positive'} value={all > 0 ? (good / all) * 100 : 0}/>
    </div>
  ) : (
    <p>No feedback given</p>
  )
}

const Button = ({label, handler}) =>  <button onClick={handler}>{label}</button>

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const all = good + neutral + bad
  return (
    <div>
      <Header title={'give feedback'}/>
      <Button label={'good'} handler={()=>setGood(good+1)}/>
      <Button label={'neutral'} handler={()=>setNeutral(neutral+1)}/>
      <Button label={'bad'} handler={()=>setBad(bad+1)}/>
      <Header title={'statistics'}/>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App