import { useEffect, useState } from 'react'
import GoalList from './components/GoalList'
import GoalForm from './components/GoalForm'
import DepositForm from './components/DepositForm'
import Overview from './components/Overview'

export default function App() {
  const [goals, setGoals] = useState([])

  
  useEffect(() => {
    fetch('http://localhost:3001/goals')
      .then(res => res.json())
      .then(setGoals)
      .catch(console.error)
  }, [])

  return (
    <div style={{ maxWidth: 900, margin: '20px auto', fontFamily: 'Arial, sans-serif' }}>
      <h1>Smart Goal Planner</h1>
      <Overview goals={goals} />
      <GoalForm setGoals={setGoals} />
      <DepositForm goals={goals} setGoals={setGoals} />
      <GoalList goals={goals} setGoals={setGoals} />
    </div>
  )
}
