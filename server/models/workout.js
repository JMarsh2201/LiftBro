const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
  name: String,
  exercises: [{type: Schema.Types.ObjectId, ref: 'exercise'}],
  datesCompleted: []
})

module.exports = mongoose.model('workout', WorkoutSchema)
