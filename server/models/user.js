const mongoose = require('mongoose')
const Schema = mongoose.Schema;

// library to hash passwords
const bcrypt = require('bcrypt')

const UserSchema = new Schema({
  username: String,
  email: String,
  password: String,
  isDeleted: {
    type: Boolean,
    default: false
  },
  workouts: [{type: Schema.Types.ObjectId, ref: 'workout'}]
})

UserSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)
}

UserSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password)
}

module.exports = mongoose.model('user', UserSchema)
