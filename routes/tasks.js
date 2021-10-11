const router = require('express').Router()

const verifyToken = require('../middlewares/verifyToken')
const tasksController = require('../controllers/tasks')

router.get('/tasks', verifyToken, tasksController.getTasks)
router.post('/tasks', verifyToken, tasksController.createTask)
router.patch('/tasks', verifyToken, tasksController.updateTask)
router.delete('/tasks', verifyToken, tasksController.deleteTask)

router.get('/tasks/count', verifyToken, tasksController.getTasksCount)
router.get('/tasks/count/:id', verifyToken, tasksController.getTasksCountForAdmin)

router.get('/tasks/:id', verifyToken, tasksController.getTasksForAdmin)

module.exports = router