
const authService = require('../services/auth')
const userValidation = require('../validations/users')

const signUpUser = async (req, res, next) => {
  try {
    console.log('signUpController.signUpUser')
    const { userName, login, password, role } = req.body
    const adminId = req.body.adminId || null

    const { error: validationError } = userValidation({ userName, login, password, role })
    
    if (validationError) {
      const { message } = validationError.details[0]
      const error = new Error(message)
      return next(error)
    }

    const query = { $or: [{ userName }, { login }] }
    const candidate = await authService.checkUserExists(query)
    
    if (candidate.user) {
      console.log('signUpController.signUpUser dublicate user error')
      const error = new Error('User with such userName or login already exists')
      return next(error)
    }

    await authService.createUser({ userName, login, password, role, adminId })
    return res.sendStatus(201)
  } catch (error) {
    console.log('signUpController.signUpUser error')
    return next(error)
  }
}

const signInUser = async (req, res, next) => {
  try {
    console.log('signInController.signInUser')
    const { userName, password } = req.body

    const query = { userName }
    const candidate = await authService.checkUserExists(query)

    if (!candidate.user) {
      console.log('signInController.signInUser check userName error')
      const error = new Error('No user with such userName')
      error.statusCode = 401
      return next(error)
    }

    const { user, role } = candidate
    const { password: hashedPassword } = user
    let accessToken
    const checkedResult = await authService.checkPasswords(password, hashedPassword)
    
    if (checkedResult) {
      accessToken = candidate.generateAccesToken(user._id, user.userName, role)
    } else {
      console.log('signInController.signInUser error')
      const error = new Error('Passwords did not match')
      error.statusCode = 401
      return next(error)
    }

    res.status(200).json({ token: accessToken })
  } catch (error) {
    console.log('signInController.signInUser error')
    error.statusCode = 401
    return next(error)
  }
}

const logoutUser = async (req, res, next) => {
  try {
    console.log('signInController.logoutUser')
    // const token = req.headers.authorization.split(' ')[1]
    // await authService.logoutUser(token)
    res.sendStatus(200)
  } catch (error) {
    console.log('signInController.logoutUser error')
    return next(error)
  }
}

module.exports = {
  signUpUser,
  signInUser,
  logoutUser
}
