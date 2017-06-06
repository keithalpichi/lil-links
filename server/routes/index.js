const apiRouter = require('express').Router()
const verifyAuth = require('../utils').verifyAuth
const userRouter = require('./api/users')
const linkRouter = require('./api/links')
const shortLinkRouter = require('./web')

apiRouter.use('/users', userRouter)
apiRouter.use('/links', verifyAuth, linkRouter)

module.exports = {
  apiRouter: apiRouter,
  shortLinkRouter: shortLinkRouter
}
