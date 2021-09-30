const authService = require('../services/auth')
const usersService = require('../services/users')

const getUsers = async (req, res, next) => {
  try {
    console.log('usersController.getUsers')
    const { id, role } = req.user
    let users = []

    if (role !== 'admin') {
      console.log('usersController.getUsers check permission error')
      const error = new Error('Non admin user')
      error.statusCode = 403
      return next(error)
    }

    const query = { adminId: id }
    users = await usersService.getUsers(query)

    res.status(200).send(users)
  } catch (error) {
    console.log('usersController.getUsers error')
    return next(error)
  }
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
