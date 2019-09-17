import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({name, onClick}) => <button onClick={onClick}>{name}</button>

const Statistics = ({good, neutral, bad}) => {
  const total = good + neutral + bad

  if (total === 0) {
    return (<p>No feedback submitted</p>)
  }

  return (
    <table>
      <tbody>
        <Statistic name="good" value={good}/>
        <Statistic name="neutral" value={neutral}/>
        <Statistic name="bad" value={bad}/>
        <Statistic name="all" value={total}/>
        <Statistic name="avarage" value={((good - bad) / total).toFixed(1)}/>
        <Statistic name="positive" value={(good / total * 100).toFixed(1) + " %"}/>
      </tbody>
    </table>
  )
}

const Statistic = ({name, value}) => (
  <tr>
    <td>{name}</td>
    <td>{value}</td>
  </tr>
)

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <>
      <h1>Give feedback</h1>
      <Button name="good" onClick={() => setGood(good +1 )}/>
      <Button name="neutral" onClick={() => setNeutral(neutral +1 )}/>
      <Button name="bad" onClick={() => setBad(bad +1 )}/>
      <h1>Statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))