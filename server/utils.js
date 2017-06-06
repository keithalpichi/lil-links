const User = require('./db/user')
const jwtLib = require('jsonwebtoken')
const SECRET = process.env.SECRET || 'secret'
const util = require('bluebird')
const verify = util.promisify(jwtLib.verify)

const getJWTFromHeaders = req => {
  return new Promise((resolve, reject) => {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
      resolve(req.headers.authorization.split(' ')[1])
    } else {
      resolve(null)
    }
  })
}

const verifyUserFromJWT = id => User.selectUser({ id: id })

const verifyAuth = (req, res, next) => {
  let id

  getJWTFromHeaders(req)
  .then(jwt => {
    if (!jwt) {
      throw new Error()
    } else {
      return verify(jwt, SECRET)
    }
  })
  .then(decoded => {
    if (!decoded) {
      throw new Error()
    } else {
      id = decoded
      return verifyUserFromJWT(decoded)
    }
  })
  .then(user => {
    if (!user) {
      throw new Error()
    } else {
      req.user_id = id
      next()
    }
  })
  .catch(() => {
    res.sendStatus(401)
  })
}

module.exports = {
  verifyAuth: verifyAuth
}
