const router = require('express').Router()

const verifyToken = require('../middlewares/verifyToken')
const usersController = require('../controllers/users')

router.get('/users', verifyToken, usersController.getUsers)
router.get('/admins', usersController.getAdmins)
router.get('/users/count', verifyToken, usersController.getUsersCount)

router.post('/user/exists', usersController.checkUserExists)

module.exports = router
