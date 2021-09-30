// const bcrypt = require('bcryptjs')
const crypto = require('crypto')
const jwt = require('jsonwebtoken')

const Admins = require('../models/Admins')
const Users = require('../models/Users')

const { SECRET_KEY } = process.env

const checkUserExists = async (query) => {
  try {
    console.log('usersService.checkUserExists')
    let user
    let role

    user = await Users.findOne(query).exec()
    if (!user) {
      user = await Admins.findOne(query).exec()
      role = 'admin'
    } else {
      role = 'user'
    }
    return { user, role, generateAccesToken }
  } catch (error) {
    console.log(`usersService.checkUserExists error: ${error}`)
    throw error
  }
}

const checkAdminById = async (adminId) => {
  try {
    console.log('usersService.checkAdminById')
    const admin = await Admins.findById(adminId).exec()
    if (!admin) {
      throw Error('No admin found for this user')
    }
  } catch (error) {
    console.log(`usersService.checkAdminById error: ${error}`)
    throw error
  }
}

const createUser = async ({ userName, login, password, role, adminId }) => {
  try {
    console.log('usersService.createUser')
    let user
    // const hashedPassword = bcrypt.hashSync(password, 1)
    const hashedPassword = await hashPassword(password)

    if (role === 'admin') {
      await createAdmin({ userName, login, hashedPassword })
    } else if (role === 'user') {
      await checkAdminById(adminId)

      user = new Users({ password: hashedPassword, userName, login, adminId })
      await user.save()
      console.log(`created user ${user}`)
    } else {
      throw Error('User role is not valid')
    }
  } catch (error) {
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
  } catch (error) {
    console.log(`usersService.createAdmin error: ${error}`)
    throw error
  }
}

const hashPassword = async (password) => {
    return new Promise((resolve, reject) => {
        const salt = crypto.randomBytes(16).toString('hex')
        crypto.scrypt(password, salt, 64, (err, derivedKey) => {
            if (err) reject(err)
            resolve(salt + ':' + derivedKey.toString('hex'))
        })
    })
}

const checkPasswords = async (password, hash) => {
  return new Promise((resolve, reject) => {
      const [salt, key] = hash.split(':')
      crypto.scrypt(password, salt, 64, (err, derivedKey) => {
          if (err) reject(err)
          resolve(key == derivedKey.toString('hex'))
      })
  })
}

const generateAccesToken = (userId, userName, role) => {
  return jwt.sign({ id: userId, userName, role }, SECRET_KEY, { expiresIn: '10m' })
}

module.exports = {
  checkUserExists,
  createUser,
  checkPasswords
}
