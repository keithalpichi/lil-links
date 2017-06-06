const router = require('express').Router()
const verifyAuth = require('../../utils').verifyAuth
const User = require('../../db/user')
const util = require('util')
const jwt = require('jsonwebtoken')
const sign = util.promisify(jwt.sign)
const SECRET = process.env.SECRET || 'secret'

router.get('/', verifyAuth, (req, res) => {
  User.selectUser({ id: req.user_id })
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
  const { session } = req.query
  if (session === 'login') {
    return logIn(req, res)
  } else if (session === 'signup') {
    return signUp(req, res)
  } else {
    return res.sendStatus(400)
  }
})

const signUp = (req, res) => {
  let user
  User.selectUserByEmail({ email: req.body.email })
  .then(user => {
    if (user) {
      throw new Error('Account already exists')
    } else {
      return Promise.resolve()
    }
  })
  .then(() => User.postUser(req.body))
  .then(result => {
    if (!result) {
      throw new Error('Failed saving user')
    } else {
      user = result
      return sign(result.id.toString(), SECRET)
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
  .catch(err => {
    res.status(400).json(err)
  })
}

const logIn = (req, res) => {
  let user
  User.selectUserByEmail({ email: req.body.email })
  .then(result => {
    if (!result) {
      throw new Error('Account does not exist')
    } else {
      user = result
      return User.comparePassword(req.body.password, result.password)
    }
  })
  .then(match => sign(user.id.toString(), SECRET))
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
  .catch(err => {
    console.log('Error logging user in: ', err)
    res.status(400).json(err)
  })
}

module.exports = router
