const mongoose = require('mongoose')
const { DB_USER, DB_PASSWORD, DB_NAME } = process.env

async function createDBConnection () {
  try {
    const DB_URL = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.i4x9u.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`
    await mongoose.connect(DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    console.log('Connected to the DB')
  } catch(error) {
    console.log(`Failed to connect to the DB : => ${error}`)
    throw error
  }
}

module.exports = {
  createDBConnection
}
