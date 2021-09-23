// eslint-disable-next-line no-unused-vars
const errorHandler = async (error, req, res, next) => {
  console.log(`errorHandler middleware error: ${error}`)
  const statusCode = error.statusCode || 500
  const status = error.status || 'Fail'
  const message = error.message
  
  res.status(statusCode).send({ status, message })
}

module.exports = errorHandler
