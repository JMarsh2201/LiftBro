const mongoose = require('mongoose');
const Schema = mongoose.Schema

const RepsSchema = new Schema({
  reps: Number,
  weight: Number,
})

module.exports = mongoose.model('reps', RepsSchema)
