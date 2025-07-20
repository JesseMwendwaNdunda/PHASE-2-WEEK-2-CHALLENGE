import { useState } from 'react'

export default function GoalForm({ setGoals }) {
  const [form, setForm] = useState({
    name: '',
    targetAmount: '',
    category: '',
    deadline: '',
  })

  function onChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  function onSubmit(e) {
    e.preventDefault()
    if (!form.name || !form.targetAmount || !form.category || !form.deadline) return

    const newGoal = {
      id: Date.now().toString(),
      name: form.name,
      targetAmount: Number(form.targetAmount),
      savedAmount: 0,
      category: form.category,
      deadline: form.deadline,
      createdAt: new Date().toISOString().slice(0, 10),
    }

    fetch('http://localhost:3001/goals', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newGoal),
    })
      .then(res => res.json())
      .then(goal => {
        setGoals(prev => [...prev, goal])
        setForm({ name: '', targetAmount: '', category: '', deadline: '' })
      })
  }

  return (
    <form onSubmit={onSubmit} style={{ marginBottom: 20 }}>
      <h2>Add New Goal</h2>
      <input
        name="name"
        placeholder="Goal Name"
        value={form.name}
        onChange={onChange}
        required
      />
      <input
        name="targetAmount"
        type="number"
        placeholder="Target Amount"
        value={form.targetAmount}
        onChange={onChange}
        required
      />
      <input
        name="category"
        placeholder="Category"
        value={form.category}
        onChange={onChange}
        required
      />
      <input
        name="deadline"
        type="date"
        value={form.deadline}
        onChange={onChange}
        required
      />
      <button type="submit">Add Goal</button>
    </form>
  )
}
