const router = require('express').Router()

const authController = require('../controllers/auth')

router.post('/signUp', authController.signUpUser)
router.post('/signIn', authController.signInUser)

module.exports = router