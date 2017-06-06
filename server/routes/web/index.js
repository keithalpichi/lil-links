const Link = require('../../db/link')

module.exports = (req, res) => {
  let path = req.params.shortLink
  let redirectUrl
  Link.selectByShortLink({ shortLink: path })
  .then(link => {
    if (!link) {
      throw new Error(`Link with short path '${path}' does not exist`)
    } else {
      redirectUrl = link.url
      return Link.incrementVisit({ shortLink: path })
    }
  })
  .then(() => {
    res.redirect(302, redirectUrl)
  })
  .catch((err) => {
    console.log(err.message)
    res.send('<h2>404: Not Found</h2>')
  })
}
