const authService = require('../services/auth')
const usersService = require('../services/users')

// eslint-disable-next-line no-unused-vars
const getUsers = async (req, res) => {
  console.log('usersController.getUsers')
}

const getAdmins = async (req, res, next) => {
  try {
    console.log('usersController.getAdmins')
    const admins = await usersService.getAdmins()
    res.status(200).send(admins)
  } catch (error) {
    console.log('usersController.signUpUser error')
    return next(error)
  }
}

const checkUserExists = async (req, res, next) => {
  try {
    console.log('usersController.signUpUser')
    const query = req.body
    const candidate = await authService.checkUserExists(query)
    const exists = Boolean(candidate.user)
    return res.status(200).json({ exists })
  } catch (error) {
    console.log('usersController.signUpUser error')
    return next(error)
  }
}

module.exports = {
  getAdmins,
  getUsers,
  checkUserExists
}
