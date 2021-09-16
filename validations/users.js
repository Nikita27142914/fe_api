const Joi = require('joi')

const userValidation = data => {
  const validateSchema = Joi.object({
    userName: Joi.string().min(5).max(255).required(),
    password: Joi.string().min(5).max(255).required()
  })

  return validateSchema.validate(data)
}

module.exports = userValidation
