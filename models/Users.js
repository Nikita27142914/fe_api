const { string } = require('joi')
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
  },
  adminId: {
    type: Schema.Types.ObjectId,
    ref: 'Admins',
    required: true
  }
})

module.exports = model('Users', userSchema)
