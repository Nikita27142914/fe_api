const authRoute = require('./auth')
const usersRoute = require('./users')

const useRoutes = (app) => {
  app.use(authRoute)
  app.use(usersRoute)
}

module.exports = {
  useRoutes
}
