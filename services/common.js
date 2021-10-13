const checkPaginationParams = (query) => {
  try {
    const { pageSize, pageNumber } = query
    let paginationParams = {}

    if (pageSize !== undefined && pageNumber !== undefined) {
      const skip = Number(pageSize) * Number(pageNumber)
      const limit = Number(pageSize)

      if (isNaN(skip) || isNaN(limit)) {
        const error = new Error('Page size or (and) page number are not provided or invalid')
        throw error
      }

      paginationParams = { skip, limit } 
    }

    return paginationParams
  } catch (error) {
    console.log(`tasksService.checkPaginationParams error: ${error}`)
    throw error
  }
}

module.exports = {
  checkPaginationParams
}
