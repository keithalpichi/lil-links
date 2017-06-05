const router = require('express').Router()
const verifyAuth = require('../utils').verifyAuth
const User = require('../db/user')
const util = require('util')
const jwt = require('jsonwebtoken')
const sign = util.promisify(jwt.sign)
const SECRET = process.env.SECRET || 'secret'

router.get('/', verifyAuth, (req, res) => {
  User.findOne({ _id: req.user_id }).exec()
  .then(user => {
    if (!user) {
      return res.sendStatus(404)
    } else {
      let userObj = {
        id: user.id,
        username: user.username,
        email: user.email
      }
      return res.json(userObj)
    }
  })
})

router.post('/', (req, res) => {
  let user
  const { session } = req.query
  if (session === 'login') {
    User.findOne({ email: req.body.email }).exec()
    .then(result => {
      if (!result) {
        throw new Error('Account does not exist')
      } else {
        user = result
        return User.comparePassword(req.body.password, result.password)
      }
    })
    .then(match => sign(user.id, SECRET))
    .then(token => {
      if (!token) {
        throw new Error('Error signing id to token')
      } else {
        let userObj = {
          token: token,
          id: user.id,
          username: user.username,
          email: user.email
        }
        return res.json(userObj)
      }
    })
    .catch(err => res.status(400).json(err))
  } else if (session === 'signup') {
    User.findOne({ email: req.body.email }).exec()
    .then((err, user) => {
      if (user) {
        throw new Error('Account already exists')
      } else {
        return Promise.resolve()
      }
    })
    .then(() => new User(req.body).save())
    .then(result => {
      if (!result) {
        throw new Error('Failed saving user')
      } else {
        user = result
        return sign(result.id, SECRET)
      }
    })
    .then(token => {
      if (!token) {
        throw new Error('Server failed to create session token')
      } else {
        let userObj = {
          token: token,
          id: user.id,
          username: user.username,
          email: user.email
        }
        return res.json(userObj)
      }
    })
    .catch(err => res.status(400).json(err))
  } else {
    return res.sendStatus(400)
  }
})

module.exports = router
