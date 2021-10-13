const Admins = require('../models/Admins')
const Users = require('../models/Users')

const getAdmins = async () => {
  try {
    console.log('usersService.getAdmins')
    const admins = await Admins.find().exec()
    return admins
  } catch (error) {
    console.log(`usersService.getAdmins error: ${error}`)
    throw error
  }
}

const getUsers = async (query, paginationParams) => {
  try {
    console.log('usersService.getUsers')
    let users = []
    const { skip, limit } = paginationParams

    if (skip !== undefined && limit !== undefined) {
      users = await Users.find(query).skip(skip).limit(limit).exec()  
    } else {
      users = await Users.find(query).exec()
    }

    return users
  } catch (error) {
    console.log(`usersService.getUsers error: ${error}`)
    throw error 
  }
}

const getUsersCount = async (query) => {
  try {
    console.log('usersService.getUsersCount')

    const usersCount = await Users.count(query)
    return { usersCount }
  } catch (error) {
    console.log(`usersService.getTasksCount error: ${error}`)
    throw error
  }
}

const checkRolePermissions = (role, expectedRole) => {
  try {
    console.log('usersService.checkRolePermissions')
    if (role !== expectedRole) {
      const error = new Error('No permissions')
      error.statusCode = 403
      throw error
    } 
  } catch (error) {
    console.log(`usersService.checkRolePermissions error: ${error}`)
    throw error 
  }
}

const checkAdminPermissionsForUser = async (usersQuery) => {
  try {
    console.log('usersService.checkAdminPermissionsForUser')
    const users = await getUsers(usersQuery, {})

    if (users.length === 0) {
      const error = new Error('No permissions')
      error.statusCode = 403
      throw error
    }
  } catch (error) {   
    console.log(`usersService.checkAdminPermissionsForUser error: ${error}`)
    throw error 
  }
} 

module.exports = {
  getAdmins,
  getUsers,
  getUsersCount,
  checkRolePermissions,
  checkAdminPermissionsForUser
}
