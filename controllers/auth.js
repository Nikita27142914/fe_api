const usersService = require('../services/users')
const userValidation = require('../validations/users')

const signUpUser = async (req, res, next) => {
  try {
    console.log('signUpController.signUpUser')
    const { userName, login, password, role } = req.body
    const adminId = req.body.adminId || null

    const { error } = userValidation({ userName, login, password })
    if (error) {
      console.log(`signUpController.signUpUser validation error: ${error}`)
      const { message } = error.details[0]
      return res.status(500).json({ message })
    }

    const query = { $or: [{ userName }, { login }] }
    const candidate = await usersService.checkUserExists(query)
    if (candidate.user) {
      console.log(`signUpController.signUpUser dublicate user error: ${error}`)
      return res.status(500).json({ message: 'User with such userName or login already exists' })
    }

    await usersService.createUser({ userName, login, password, role, adminId })
    return res.sendStatus(201)
  } catch (error) {
    console.log(`signUpController.signUpUser error: ${error}`)
    res.status(500).json({ message: 'SignUp error' })
  }
}

const signInUser = async (req, res) => {
  try {
    console.log('signInController.signInUser')
    const { userName, password } = req.body

    const query = { userName }
    const candidate = await usersService.checkUserExists(query)
    if (!candidate.user) {
      res.status(401).json({ message: 'No user with such userName' })
    }

    const { user, role } = candidate
    const { password: hashedPassword } = user
    usersService.checkPasswords(password, hashedPassword)
    const accessToken = candidate.generateAccesToken(user._id, role)

    res.status(200).json({ token: accessToken })
  } catch (error) {
    console.log(`signInController.signInUser error: ${error}`)
    res.status(401).json({ message: 'SignIn error' })
  }
}

module.exports = {
  signUpUser,
  signInUser
}
