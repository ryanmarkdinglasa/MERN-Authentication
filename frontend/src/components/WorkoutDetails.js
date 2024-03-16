import { useWorkoutsContext } from '../hooks/useWorkoutsContext'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const WorkoutDetails = ({ workout }) => {
  const { dispatch } = useWorkoutsContext()

  const handleClick = async () => {
    const response = await fetch('/api/workouts/' + workout.Id, {
      method: 'DELETE'
    })
    const json = await response.json()

    if (response.ok) {
      dispatch({ type: 'DELETE_WORKOUT', payload: json })
    }
  }

  // Check if workout.createdAt is a valid date
  const createdAtDate = workout.createdAt ? new Date(workout.createdAt) : null;

  return (
    <div className="workout-details">
      <h4>{workout.Id}</h4>
      <p><strong>Load (kg): </strong>{workout.load}</p>
      <p><strong>Reps: </strong>{workout.reps}</p>
      {/* Format distance to now only if createdAtDate is a valid date */}
      {createdAtDate && (
        <p>{formatDistanceToNow(createdAtDate, { addSuffix: true })} date</p>
      )}
      <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
    </div>
  )
}

export default WorkoutDetails
