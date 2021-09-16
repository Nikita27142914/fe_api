const authRoute = require('./auth')
const adminsRoute = require('./admins')
const usersRoute = require('./users')

const useRoutes = (app) => {
  // app.use(signUpRoute)
  // app.use(signInRoute)
  app.use(authRoute)
  app.use(adminsRoute)
  app.use(usersRoute)
}

module.exports = {
  useRoutes
}
