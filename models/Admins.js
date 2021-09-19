const { model, Schema } = require('mongoose')

const userSchema = new Schema({
  userName: {
    type: String,
    unique: true,
    required: true
  },
  login: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  }
})

module.exports = model('Admins', userSchema)
