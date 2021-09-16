const router = require('express').Router()

const usersController = require('../controllers/users')

router.get('/admins', usersController.getAdmins)

module.exports = router
