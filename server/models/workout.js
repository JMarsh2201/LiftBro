const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
  name: String,
  exercises: [],
  datesCompleted: [],
  user: {type: Schema.Types.ObjectId, ref: 'user'},
  completions: [{type: Schema.Types.ObjectId, ref: 'completion'}]
})

module.exports = mongoose.model('workout', WorkoutSchema)
