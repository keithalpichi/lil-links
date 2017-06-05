const url = require('url')
const apiRouter = require('express').Router()
const verifyAuth = require('../utils').verifyAuth
const userRouter = require('./users')
const linkRouter = require('./links')
const Link = require('../db/link')

apiRouter.use('/users', userRouter)
apiRouter.use('/links', verifyAuth, linkRouter)

const shortLinkRouter = (req, res) => {
  let path = url.parse(req.url).pathname.split('/')[1]
  Link.findOne({ shortLink: path }).exec()
  .then(link => {
    if (!link) {
      throw new Error(`Link with short path '${path}' does not exist`)
    } else {
      res.redirect(link.url)
      Link.updateOne({ shortLink: path }, { $inc: { visits: 1 } }).exec()
    }
  })
  .catch(() => {
    res.send('<h2>404: Not Found</h2>')
  })
}

module.exports = {
  apiRouter: apiRouter,
  shortLinkRouter: shortLinkRouter
}
