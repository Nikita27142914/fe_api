const usersService = require('../services/users')

const getUsers = async (req, res) => {
  console.log('usersController.getUsers')
}

const getAdmins = async (req, res) => {
  try {
    console.log('usersController.getAdmins')
    const admins = await usersService.getAdmins()
    res.status(200).send(admins)
  } catch (error) {
    console.log(`usersController.signUpUser error: ${error}`)
    res.sendStatus(500)
  }
}

const checkUserExists = async (req, res) => {
  try {
    console.log('usersController.signUpUser')
    const query = req.body
    const candidate = await usersService.checkUserExists(query)
    const exists = Boolean(candidate.user)
    return res.status(200).json({ exists })
  } catch (error) {
    console.log(`usersController.signUpUser error: ${error}`)
    res.sendStatus(500)
  }
}

module.exports = {
  getAdmins,
  getUsers,
  checkUserExists
}
