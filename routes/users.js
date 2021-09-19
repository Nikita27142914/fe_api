const router = require('express').Router()

const usersController = require('../controllers/users')

router.get('/users', usersController.getUsers)
router.post('/user/exists', usersController.checkUserExists)

router.get('/admins', usersController.getAdmins)

module.exports = router
