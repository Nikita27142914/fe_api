const usersService = require('../services/users')
const tasksService = require('../services/tasks')
const taskValidation = require('../validations/tasks')

const getTasks = async (req, res, next) => {
  try {
    console.log('tasksController.getTasks')
    const { id: userId, role } = req.user
    let tasks = []

    usersService.checkRolePermissions(role, 'user')

    const query = { userId }
    tasks = await tasksService.getTasks(query)

    res.status(200).send(tasks)
  } catch (error) {
    console.log('tasksController.getTasks error')
    return next(error)
  }
}

const getTasksForAdmin = async (req, res, next) => {
  try {
    console.log('tasksController.getTasksForAdmin')
    const userId = req.params.id
    const { id: adminId, role } = req.user
    let tasks = []

    usersService.checkRolePermissions(role, 'admin')
    
    const usersQuery = {_id: userId, adminId}
    await usersService.checkAdminPermissionsForUser(usersQuery)

    const query = { userId }
    tasks = await tasksService.getTasks(query)

    res.status(200).send(tasks)
  } catch (error) {
    console.log('tasksController.getTasksForAdmin error')
    return next(error)
  }
}

const createTask = async (req, res, next) => {
  try {
    const { name, userId } = req.body
    const { id: adminId, userName, role } = req.user
    
    usersService.checkRolePermissions(role, 'admin')
    
    const { error: validationError } = taskValidation({ name })
    
    if (validationError) {
      const { message } = validationError.details[0]
      const error = new Error(message)
      error.statusCode = 500
      return next(error)
    }

    const usersQuery = {_id: userId, adminId}
    await usersService.checkAdminPermissionsForUser(usersQuery)

    const taskQuery = { createdBy: userName, name, userId }
    await tasksService.checkDublicate(taskQuery)
    const newTask = await tasksService.createTask(taskQuery)

    res.status(201).send(newTask)
  } catch (error) {
    console.log('tasksController.createTask error')
    return next(error)
  }
}

const updateTask = async (req, res, next) => {
  try {
    const { userId } = req.body
    const { id, userName, role } = req.user

    if (role === 'admin') {
      const usersQuery = {_id: userId, adminId: id}
      await usersService.checkAdminPermissionsForUser(usersQuery)
    } else if (id !== userId) {
      const error = new Error('No permissions')
      error.statusCode = 403
      return next(error)
    }

    const taskQuery = { ...req.body, userName }
    if (taskQuery.name) {
      const { id, userId, name } = taskQuery
      const dublicateQuery = { $and: [{ _id: { $ne: id }}, { userId }, { name }] }
      await tasksService.checkDublicate(dublicateQuery)
    }
    delete taskQuery.userId
    const updatedTask = await tasksService.updateTask(taskQuery)

    res.status(200).send(updatedTask)
  } catch (error) {
    console.log('tasksController.updateTask error')
    return next(error)
  }
}

const deleteTask = async (req, res, next) => {
  try {
    const { id: taskId, userId } = req.body
    const { id: adminId, role } = req.user

    usersService.checkRolePermissions(role, 'admin')

    const usersQuery = {_id: userId, adminId}
    await usersService.checkAdminPermissionsForUser(usersQuery)
    
    const taskQuery = {_id: taskId}
    await tasksService.checkTaskChecked({ ...taskQuery, checked: false })
    await tasksService.deleteTask(taskQuery)

    res.sendStatus(204)
  } catch (error) {
    console.log('tasksController.updateTask error')
    return next(error)
  }
}

module.exports = {
  getTasks,
  getTasksForAdmin,
  createTask,
  updateTask,
  deleteTask
}