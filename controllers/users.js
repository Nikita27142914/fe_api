const authService = require('../services/auth')
const usersService = require('../services/users')
const commonService = require('../services/common')

const getUsers = async (req, res, next) => {
  try {
    console.log('usersController.getUsers')
    const { id, role } = req.user
    let users = []
    
    const paginationParams = commonService.checkPaginationParams(req.query)

    if (role !== 'admin') {
      console.log('usersController.getUsers check permission error')
      const error = new Error('Non admin user')
      error.statusCode = 403
      return next(error)
    }

    const query = { adminId: id }

    if (req.query.searchName) {
      const { searchName } = req.query
      query.userName = { $regex: '.*' + searchName + '.*' }
    }
    users = await usersService.getUsers(query, paginationParams)

    res.status(200).send(users)
  } catch (error) {
    console.log('usersController.getUsers error')
    return next(error)
  }
}

const getUsersCount = async (req, res, next) => {
  try {
    console.log('usersController.getUsersCount')
    const { id, role } = req.user

    if (role !== 'admin') {
      console.log('usersController.getUsersCount check permission error')
      const error = new Error('Non admin user')
      error.statusCode = 403
      return next(error)
    }

    const query = { adminId: id }
    const usersCount = await usersService.getUsersCount(query)

    res.status(200).send(usersCount)
  } catch (error) {
    console.log('usersController.getUsersCount error')
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
  getUsersCount,
  checkUserExists
}
