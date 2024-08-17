const { request } = require('http')
const Users = require('../service/userService')
const notFoundHandler = require('./notFoundHandler')

const users = new Users()
function fetchAllUsersHandler (req, res) {
  if (req.method !== 'GET') {
    notFoundHandler(req, res)
    return
  }
  const responseData = users.getAll()
  const responseString = JSON.stringify(responseData)
  res.statusCode = 200
  res.setHeader('Content-Type', 'application/json')
  res.end(responseString)
}

function fetchUserByUsernameHandler (req, res, username) {
  if (req.method !== 'GET') {
    notFoundHandler(req, res)
    return
  }
  const responseData = users.getByUsername(username)
  const responseString = JSON.stringify(responseData)
  res.statusCode = 200
  res.setHeader('Content-Type', 'application/json')
  res.end(responseString)
}

function loginHandler (req, res) {
  if (req.method !== 'POST') {
    notFoundHandler(req, res)
    return
  }
  let requestString = ''
  req.on('data', (chunk) => {
    requestString += chunk
  })
  req.on('end', () => {
    const requestData = JSON.parse(requestString)
    const result = users.login(requestData.username, requestData.password)
    if (!result.login) {
      res.statusCode = 403
      const responseData = { errorMessage: 'Login failed' }
      const responseString = JSON.stringify(responseData)
      res.setHeader('Content-Type', 'application/json')
      res.end(responseString)
      return
    }
    const responseData = { message: 'Login successful', user: result.user }
    const responseString = JSON.stringify(responseData)
    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    res.end(responseString)
  })
}

module.exports = {
  fetchAllUsersHandler,
  fetchUserByUsernameHandler,
  loginHandler
}