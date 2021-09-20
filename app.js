const morgan = require('morgan')

const http = require('http')
const express = require('express')
const cors = require('cors')

const { useRoutes } = require('./routes')
const { serverListen } = require('./config/server')
const { createDBConnection } = require('./config/db_connection')

const app = express()
const server = http.createServer(app)

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))


useRoutes(app)
start()

async function start() {
  try { 
      await createDBConnection()
      serverListen(server)
  } catch (error) {
      console.log(error)
  }
}
