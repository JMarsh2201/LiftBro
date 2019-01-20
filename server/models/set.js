const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const SetSchema = new Schema({
  date: Date,
  reps: {type: Schema.Types.ObjectId, ref: 'rep'}
})

module.exports = mongoose.model('set', SetSchema)
