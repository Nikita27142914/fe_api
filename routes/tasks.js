const router = require('express').Router()

const verifyToken = require('../middlewares/verifyToken')
const tasksController = require('../controllers/tasks')

router.get('/tasks', verifyToken, tasksController.getTasks)
router.get('/tasks/:id', verifyToken, tasksController.getTasksForAdmin)

router.post('/tasks', verifyToken, tasksController.createTask)

router.patch('/tasks', verifyToken, tasksController.updateTask)

router.delete('/tasks', verifyToken, tasksController.deleteTask)

module.exports = router