import { useState } from 'react'

export default function DepositForm({ goals, setGoals }) {
  const [goalId, setGoalId] = useState('')
  const [amount, setAmount] = useState('')

  function onSubmit(e) {
    e.preventDefault()
    if (!goalId || !amount) return

    const goal = goals.find(g => g.id === goalId)
    if (!goal) return

    const newSavedAmount = goal.savedAmount + Number(amount)

    fetch(`https://phase-2-week-2-challenge.onrender.com${goalId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ savedAmount: newSavedAmount }),
    })
      .then(res => res.json())
      .then(updatedGoal => {
        setGoals(goals.map(g => (g.id === updatedGoal.id ? updatedGoal : g)))
        setGoalId('')
        setAmount('')
      })
  }

  return (
    <form onSubmit={onSubmit} style={{ marginBottom: 20 }}>
      <h2>Make a Deposit</h2>
      <select value={goalId} onChange={e => setGoalId(e.target.value)} required>
        <option value="">Select Goal</option>
        {goals.map(goal => (
          <option key={goal.id} value={goal.id}>
            {goal.name}
          </option>
        ))}
      </select>
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={e => setAmount(e.target.value)}
        required
      />
      <button type="submit">Deposit</button>
    </form>
  )
}