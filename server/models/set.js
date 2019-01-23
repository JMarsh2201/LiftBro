const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const SetSchema = new Schema({
  date: {
    type: Date,
    default: Date.now()
  },
  reps: Number,
  weight: Number,
  completion: {type: Schema.Types.ObjectId, ref: 'completion'},
  exercise: {type: Schema.Types.ObjectId, ref: 'exercise'}
})

module.exports = mongoose.model('set', SetSchema)
