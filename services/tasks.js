const Tasks = require('../models/Tasks')

const getTasks = async (query) => {
  try {
    console.log('tasksService.getTasks')
    const tasks = await Tasks.find(query).exec()
    return tasks
  } catch (error) {
    console.log(`tasksService.getTasks error: ${error}`)
    throw error
  }
}

const createTask = async (query) => {
  try {
    console.log('tasksService.createTask')
    const task = new Tasks(query)
    await task.save()
    return task
  } catch (error) {
    console.log(`tasksService.createTask error: ${error}`)
    throw error
  }
}

const updateTask = async (query) => {
  try {
    console.log('tasksService.updateTask ')
    const { id: _id, userName: updatedBy } = query
    const updatedAt = new Date()
    delete query.id 
    delete query.userName 
    await Tasks.updateOne({_id}, { ...query, updatedAt, updatedBy })
    const task = await Tasks.findById(_id)
    return task
  } catch (error) {
    console.log(`tasksService.updateTask error: ${error}`)
    throw error
  }
}

const deleteTask = async (query) => {
  try { 
    console.log('tasksService.deleteTask')
    const tasks = await getTasks(query)

    if (tasks.length === 0) {
      const error = new Error('No task found')
      throw error
    }

    await Tasks.deleteOne(query)
  } catch (error) {
    console.log(`tasksService.deleteTask error: ${error}`)
    throw error
  }
}

const checkDublicate = async (query) => {
  try {
    console.log('tasksService.checkDublicate')
    const tasks = await getTasks(query)

    if (tasks.length !== 0) {
      const error = new Error('Task with such name already exists for user')
      throw error
    }
  } catch (error) {
    console.log(`tasksService.checkDublicate error: ${error}`)
    throw error
  }
}

const checkTaskChecked = async (query) => {
  try {
    console.log('tasksService.checkDublicate')
    const tasks = await getTasks(query)

    if (tasks.length !== 0) {
      const error = new Error('Task is not checked to be deleted')
      throw error
    }
  } catch (error) {
    console.log(`tasksService.checkDublicate error: ${error}`)
    throw error
  }
}

module.exports = {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
  checkDublicate,
  checkTaskChecked
}
