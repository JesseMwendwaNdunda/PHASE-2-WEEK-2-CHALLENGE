import { useEffect, useState } from 'react'
import GoalList from './components/GoalList'
import GoalForm from './components/GoalForm'
import DepositForm from './components/DepositForm'
import Overview from './components/Overview'

function App() {
  const [goals, setGoals] = useState([])
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('http://localhost:3001/goals')
      .then(res => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`)
        }
        return res.json()
      })
      .then(data => {
        if (!Array.isArray(data)) {
          throw new Error("Received data is not an array")
        }
        setGoals(data)
        setLoading(false)
      })
      .catch(err => {
        console.error("Failed to fetch goals:", err)
        setError(err.message)
        setLoading(false)
      })
  }, [])

  if (loading) return <p>Loading goals...</p>
  if (error) return <p style={{ color: 'red' }}>Error: {error}</p>

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

export default App


