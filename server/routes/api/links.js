const router = require('express').Router()
const Link = require('../../db/link')

router.get('/', (req, res) => {
  Link.selectLinks({ ownerId: req.user_id })
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
  return Link.postLink({ url: req.body.url, ownerId: parseInt(req.user_id) })
  .then(link => {
    if (!link) {
      throw new Error('Error creating link')
    } else {
      return res.status(201).json(link)
    }
  })
  .catch(err => {
    res.status(400).json(err)
  })
})

module.exports = router
