const { 
  getDataByTable,
  deleteDataById,
  getDataById,
  insertData } = require('../models/globalModel')

// get all workouts
const getWorkouts = async (req, res) => {
  const workouts = await getDataByTable('workout')
  res.status(200).json(workouts)
}

// get a single workout
const getWorkout = async (req, res) => {
  const { Id } = req.params
  
  if (!Id) {
    return res.status(404).json({error: 'No such workout'})
  }

  const workout = await getDataById(Id, 'workout')
  if (!workout) {
    return res.status(404).json({error: 'No such workout'})
  }
  
  res.status(200).json(workout)
}


// create new workout
const createWorkout = async (req, res) => {
  const { title, loads, reps } = req.body;

  const missingFields = [];
  
  // Check for missing fields
  if (!title) missingFields.push('title');
  if (!loads) missingFields.push('loads');
  if (!reps) missingFields.push('reps');

  if (missingFields.length > 0) {
    return res.status(400).json({ error: 'Please fill in all the fields', missingFields });
  }

  try {
    // Create the workout by inserting data into the database
    const workoutData = {
      title,
      loads,
      reps,
      createdAt: new Date()
    };

    const workout = await insertData(workoutData);
    
    // Respond with the created workout
    res.status(201).json(workout);
  } catch (error) {
    // Handle database errors
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// delete a workout
const deleteWorkout = async (req, res) => {
  const { Id } = req.params

  if (!Id) {
    return res.status(404).json({error: 'No such workout'})
  }

  const workout = await deleteDataById(Id, 'workout')

  if (!workout) {
    return res.status(400).json({error: 'No such workout'})
  }

  res.status(200).json(workout)
}
/*
// update a workout
const updateWorkout = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such workout'})
  }

  const workout = await Workout.findOneAndUpdate({_id: id}, {
    ...req.body
  })

  if (!workout) {
    return res.status(400).json({error: 'No such workout'})
  }

  res.status(200).json(workout)
}
*/

module.exports = {
  getWorkouts,
  getWorkout,
  createWorkout,
  deleteWorkout
}