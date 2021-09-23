const Admins = require('../models/Admins')

const getAdmins = async () => {
  try {
    console.log('usersService.getAdmins')
    const admins = await Admins.find().exec()
    console.log('admins ', admins)
    return admins
  } catch (error) {
    console.log(`usersService.getAdmins error: ${error}`)
    throw error
  }
}

module.exports = {
  getAdmins
}
