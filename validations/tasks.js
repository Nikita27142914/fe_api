const Joi = require('joi')

const taskValidation = data => {
  const validateSchema = Joi.object({
    name: Joi.string().min(4).max(255).required()
  })

  return validateSchema.validate(data)
}

module.exports = taskValidation
