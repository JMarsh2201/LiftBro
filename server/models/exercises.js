const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const MuscleGroupSchema = new Schema({
  name: String,
  exercises: []
})

const ExerciseSchema = new Schema({
  name: String,
  muscleGroup: {type: Schema.Types.ObjectId, ref: 'muscleGroup'},
  workout: {type: Schema.Types.ObjectId, ref: 'workout'},
  sets: [{type: Schema.Types.ObjectId, ref: 'set'}]
})

module.exports = {
  muscleGroup: mongoose.model('muscleGroup', MuscleGroupSchema),
  exercise: mongoose.model('exercise', ExerciseSchema)
}
