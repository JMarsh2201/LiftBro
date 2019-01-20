const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const MuscleGroupSchema = new Schema({
  name: String,
  // each exercise in this array has a reference to a muscle group.
  exercises: [{type: Schema.Types.ObjectId, ref: 'exercise'}],
  isSelected: {
    type: Boolean,
    default: false
  }
})

const ExerciseSchema = new Schema({
  name: String,
  muscleGroup: {type: Schema.Types.ObjectId, ref: 'muscleGroup'},
  isSelected: {
    type: Boolean,
    default: false
  }
})

module.exports = {
  muscleGroup: mongoose.model('muscleGroup', MuscleGroupSchema),
  exercise: mongoose.model('exercise', ExerciseSchema)
}
