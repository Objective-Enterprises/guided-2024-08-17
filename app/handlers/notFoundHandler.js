function notFoundHandler(req, res) {
  res.statusCode = 404
  const responseData = { errorMessage: 'Not found' }
  const responseString = JSON.stringify(responseData)
  res.setHeader('Content-Type', 'application/json')
  res.end(responseString)
  return
}

module.exports = notFoundHandler