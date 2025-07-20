import GoalCard from './GoalCard'

function GoalList({ goals, setGoals }) {
  return (
    <section>
      <h2>Your Goals</h2>
      {goals.length === 0 && <p>No goals yet</p>}
      {goals.map(goal => (
        <GoalCard key={goal.id} goal={goal} setGoals={setGoals} />
      ))}
    </section>
  )
}

export default GoalList

