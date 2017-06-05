const router = require('express').Router()
const verifyAuth = require('../utils').verifyAuth
// const User = require('../db/user')

router.get('/', verifyAuth, (req, res) => {
  // jwt from req.token
  // get user from DB
  // return 200 with user's info
})

router.post('/', (req, res) => {
  // get username, email, and password from req.body
  // init new User
  // on success, create new jwt
  // on failure, response 400
  // return 200 with new token
})

module.exports = router
