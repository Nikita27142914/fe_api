const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const Admins = require('../models/Admins')
const Users = require('../models/Users')

const { SECRET_KEY } = process.env

const getAdmins = async () => {
  try {
    console.log('usersService.getAdmins')
    const admins = await Admins.find().exec()
    console.log('admins ', admins)
    return admins
  } catch(error) {
    console.log(`usersService.getAdmins error: ${error}`)
    throw error
  }
}

const checkUserExists = async (query) => {
  try {
    console.log('usersService.checkUserExists')
    let user
    let role

    user = await Users.findOne(query).exec()
    if(!user) {
      user = await Admins.findOne(query).exec()
      role = 'admin'
    } else {
      role = 'user'
    }

    return { user, role, generateAccesToken }
  } catch(error) {
    console.log(`usersService.checkUserExists error: ${error}`)
    throw error
  }
}

const checkAdminById = async (adminId) => {
  console.log('usersService.checkAdminById')
  const admin = await Admins.findById(adminId).exec()
  if(!admin) {
    console.log('usersService.checkAdminById error')
    throw Error('No admin found for this user')
  }
}

const createUser = async ({ userName, login, password, role, adminId }) => {
  try {
    console.log('usersService.createUser')
    let user
    const hashedPassword = bcrypt.hashSync(password, 1)

    if(role === 'admin') {
      await createAdmin({ userName, login, hashedPassword })
    } else if(role === 'user') {
      await checkAdminById(adminId)

      user = new Users({ password: hashedPassword, userName, login, adminId })
      await user.save()
      console.log(`created user ${user}`)
    } else {
      throw Error('User role is not valid')
    }
  } catch(error) {
    console.log(`usersService.createUser error: ${error}`)
    throw error
  }
}

const createAdmin = async ({ userName, login, hashedPassword }) => {
  try {
    console.log('usersService.createAdmin')
    const admin = new Admins({ password: hashedPassword, userName, login })
    await admin.save()
    console.log(`created admin ${admin}`)
  } catch(error) {
    console.log(`usersService.createAdmin error: ${error}`)
    throw error
  }
}

const checkPasswords = (password, hashedPassword) => {
  const result = bcrypt.compareSync(password, hashedPassword)
  if(!result) {
    throw Error('Passwords did not match')
  }
}

const generateAccesToken = (userId, role) => {
  console.log('generateAccesToken ', userId, role)
  return jwt.sign({ id: userId, role }, SECRET_KEY, { expiresIn: '10m' })
}

module.exports = {
  getAdmins,
  checkUserExists,
  createUser,
  checkPasswords
}
