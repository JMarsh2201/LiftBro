const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CompletionSchema = new Schema({
  workout: {type: Schema.Types.ObjectId, ref: 'workout'},
  date: {
    type: Date,
    default: Date.now()
  },
  sets: [{type: Schema.Types.ObjectId, ref: 'set'}]
})

module.exports = mongoose.model('completion', CompletionSchema)
