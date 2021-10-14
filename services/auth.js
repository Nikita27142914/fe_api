const crypto = require('crypto')
const jwt = require('jsonwebtoken')
// const path = require('path')
// const fs = require('fs')

const Admins = require('../models/Admins')
const Users = require('../models/Users')

const { SECRET_KEY } = process.env

const checkUserExists = async (query) => {
  try {
    console.log('authService.checkUserExists')
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
    console.log(`authService.checkUserExists error: ${error}`)
    throw error
  }
}

const checkAdminById = async (adminId) => {
  try {
    console.log('authService.checkAdminById')
    const admin = await Admins.findById(adminId).exec()
    if (!admin) {
      throw Error('No admin found for this user')
    }
  } catch (error) {
    console.log(`authService.checkAdminById error: ${error}`)
    throw error
  }
}

const createUser = async ({ userName, login, password, role, adminId }) => {
  try {
    console.log('authService.createUser')
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
    console.log(`authService.createUser error: ${error}`)
    throw error
  }
}

const createAdmin = async ({ userName, login, hashedPassword }) => {
  try {
    console.log('authService.createAdmin')
    const admin = new Admins({ password: hashedPassword, userName, login })
    await admin.save()
    console.log(`created admin ${admin}`)
  } catch (error) {
    console.log(`authService.createAdmin error: ${error}`)
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
  const token = jwt.sign({ id: userId, userName, role }, SECRET_KEY, { expiresIn: '10m'}, { algorithm: 'HS256' })
  return token
}

// const logoutUser = async (token) => {
//   try {
//     console.log('authService.logoutUser')

//     const blackListTokens = await getBlackListTokens()



//   } catch (error) {
//     console.log(`authService.logoutUser error: ${error}`)
//     throw error
//   }
// }


// const getBlackListTokens = async () => {
//   console.log('authService.logoutUser')
//   return new Promise((resolve, reject) => {
//     fs.readFile(
//       path.resolve(__dirname, '../static/BlackList.json'),
//       'utf-8',
//       (err, data) => {
//         if (err) {
//           reject(err)
//         } else {
//           resolve(JSON.parse(data))
//         }
//       }
//     )
//   })
// } 

// const updateBlackListTokens = async () => {

// }

module.exports = {
  checkUserExists,
  createUser,
  checkPasswords,
  // logoutUser
}
