export default function Overview({ goals }) {
  const totalGoals = goals.length
  const totalSaved = goals.reduce((sum, g) => sum + g.savedAmount, 0)
  const completedGoals = goals.filter(g => g.savedAmount >= g.targetAmount).length

  return (
    <section style={{ marginBottom: 20 }}>
      <h2>Overview</h2>
      <p>Total Goals: {totalGoals}</p>
      <p>Total Saved: KES {totalSaved}</p>
      <p>Completed Goals: {completedGoals}</p>
    </section>
  )
}
