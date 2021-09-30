const { model, Schema } = require('mongoose')

const taskSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  checked: {
    type: Boolean,
    default: false
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'Users',
    required: true
  },
  createdBy: {
    type: String,
    required: true
  },
  updatedBy: {
    type: String,
    default: null
  },
  createdAt: {
    type: Date,
    default: new Date()
  },
  updatedAt: {
    type: Date,
    default: null
  },
})

module.exports = model('Tasks', taskSchema)
