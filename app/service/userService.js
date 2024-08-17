const fs = require("fs");

const usersString = fs.readFileSync('./app/data/users.json', 'utf-8')
const usersData = JSON.parse(usersString)

class Users {
  constructor () {
    this.users = usersData
  }

  getAll () {
    return this.users
  }

  getByUsername (username) {
    const user = this.users.find((user) => {
      const match = user.username === username
      return match
    })
    return user
  }

  login (username, password) {
    const user = this.users.find(user => {
      const usernameMatch = user.username === username
      if (!usernameMatch) {
        return false
      }
      const passwordMatch = user.password === password
      return passwordMatch
    })
    if (!user) {
      const result = { login: false, user: null }
      return result
    }
    const result = { login: true, user }
    return result
  }
}

module.exports = Users