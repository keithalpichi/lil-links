const router = require('express').Router()
const verifyAuth = require('../utils').verifyAuth
const userRouter = require('./users')
const linkRouter = require('./links')

router.use('/users', userRouter)
router.use('/links', verifyAuth, linkRouter)

module.exports = router
