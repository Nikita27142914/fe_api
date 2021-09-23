const { PORT } = process.env

const serverListen = (server) => {
  server.listen(PORT, (error) => {
    if (error) {
      console.log(`Server listen error ${error}`)
      throw error
    }
    console.log(`Server is listening on ${PORT}`)
  })
}

module.exports = {
  serverListen
}