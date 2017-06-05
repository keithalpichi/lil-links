const User = require('./db/user')
const jwtLib = require('jsonwebtoken')
const SECRET = process.env.SECRET || 'secret'
const util = require('util')
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

const sendUnauthorized = res => res.status(401).json('Unauthorized')
const verifyUserFromJWT = id => User.findOne({ id: id })

const verifyAuth = (req, res, next) => {
  let token

  getJWTFromHeaders(req)
  .then(jwt => !jwt ? sendUnauthorized(res) : verify(jwt, SECRET))
  .then((err, decoded) => {
    if (err) {
      sendUnauthorized(res)
    } else {
      token = decoded
      verifyUserFromJWT(decoded)
    }
  })
  .then((err, user) => {
    if (err) {
      return sendUnauthorized(res)
    } else {
      req.token = token
      next()
    }
  })
}

module.exports = {
  verifyAuth: verifyAuth
}
