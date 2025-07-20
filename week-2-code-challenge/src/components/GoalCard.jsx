function GoalCard({ goal, setGoals }) {
  const progress = Math.min((goal.savedAmount / goal.targetAmount) * 100, 100).toFixed(0)

  const daysLeft = Math.ceil((new Date(goal.deadline) - new Date()) / (1000 * 60 * 60 * 24))

  const overdue = daysLeft < 0 && goal.savedAmount < goal.targetAmount
  const warning = daysLeft <= 30 && daysLeft >= 0 && goal.savedAmount < goal.targetAmount

  function handleDelete() {
    fetch(`https://phase-2-week-2-challenge.onrender.com/goals/${goal.id}`, { method: 'DELETE' })
      .then(() => {
        setGoals(prev => prev.filter(g => g.id !== goal.id))
      })
  }

  return (
    <div
      style={{
        border: '1px solid #ddd',
        marginBottom: 10,
        padding: 10,
        backgroundColor: overdue ? '#f8d7da' : warning ? '#fff3cd' : 'white',
      }}
    >
      <h3>
        {goal.name} <small>({goal.category})</small>
      </h3>
      <p>
        Saved: KES {goal.savedAmount} / KES {goal.targetAmount}
      </p>
      <progress max="100" value={progress} style={{ width: '100%' }} />
      <p>{progress}% complete</p>
      <p>
        Deadline: {goal.deadline}{' '}
        {warning && <span style={{ color: '#856404' }}>⚠ Deadline soon</span>}
        {overdue && <span style={{ color: '#721c24' }}> Overdue!</span>}
      </p>
      <button onClick={handleDelete}>Delete Goal</button>
    </div>
  )
}

export default GoalCard
