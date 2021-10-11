const router = require('express').Router()

const verifyToken = require('../middlewares/verifyToken')
const authController = require('../controllers/auth')

router.get('/logout', verifyToken, authController.logoutUser)

router.post('/signUp', authController.signUpUser)
router.post('/signIn', authController.signInUser)

module.exports = router