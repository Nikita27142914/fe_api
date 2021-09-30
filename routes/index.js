const authRoute = require('./auth')
const usersRoute = require('./users')
const tasksRoute = require('./tasks')

const useRoutes = (app) => {
  app.use(authRoute)
  app.use(usersRoute)
  app.use(tasksRoute)
}

module.exports = {
  useRoutes
}
