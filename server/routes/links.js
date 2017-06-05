const router = require('express').Router()
const Link = require('../db/link')

router.get('/', (req, res) => {
  Link.find({ ownerId: parseInt(req.user_id) }).exec()
  .then(links => {
    if (!links) {
      throw new Error('Error fetching links')
    } else {
      return res.json(links)
    }
  })
  .catch(err => {
    res.status(400).json(err)
  })
})

router.post('/', (req, res) => {
  new Link({ url: req.body.url, ownerId: parseInt(req.user_id) }).save()
  .then(link => {
    if (!link) {
      throw new Error('Error creating link')
    } else {
      let linkObj = {
        url: link.url,
        shortLink: link.shortLink,
        visits: link.visits,
        createdAt: link.createdAt
      }
      return res.status(201).json(linkObj)
    }
  })
  .catch(err => {
    console.log(err)
    res.status(400).json(err)
  })
})

module.exports = router
