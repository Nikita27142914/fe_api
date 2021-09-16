const jwt = require('jsonwebtoken')

const { SECRET_KEY } = process.env

const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1]
    if(!token) {
      throw Error('No token in request')
    }

    const decodedData = jwt.verify(token, SECRET_KEY)
    req.user = decodedData
    next()
  } catch(error) {
    console.log(`middlewares.verifyToken error ${error}`)
    res.sendStatus(401)
  }
}

module.exports = verifyToken
