const Joi = require('joi')

const {userName: userNamePattern, password: passwordPattern} = require('./patterns')

const userValidation = data => {
  const validateSchema = Joi.object({
    userName: Joi.string().min(5).max(255).regex(userNamePattern).required(),
    login: Joi.string().email().required(),
    password: Joi.string().min(5).max(255).regex(passwordPattern).required(),
    role: Joi.string().required()
  })

  return validateSchema.validate(data)
}

module.exports = userValidation
