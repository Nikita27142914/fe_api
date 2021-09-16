const router = require('express').Router()

const usersController = require('../controllers/users')

router.get('/users', usersController.getUsers)

module.exports = router
