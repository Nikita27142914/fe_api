const errorHandler = async (error, req, res, next) => {
  console.log(`errorHandler middleware validation error: ${error}`)
}

module.exports = errorHandler
