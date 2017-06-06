const crypto = require('crypto')
const db = require('./index')

module.exports.selectLinks = ({ ownerId }) => {
  return db.manyOrNone(`
    SELECT * FROM links WHERE ownerid = ${ownerId}
    ORDER BY createdat DESC
  `)
}

module.exports.selectByShortLink = ({ shortLink }) => {
  return db.oneOrNone(`SELECT * FROM links WHERE shortlink = '${shortLink}'`)
}

module.exports.incrementVisit = ({ shortLink }) => {
  return db.none(`UPDATE links SET visits = visits + 1 WHERE shortlink = '${shortLink}'`)
}

module.exports.postLink = ({ url, ownerId }) => {
  let shasum = crypto.createHash('sha1')
  shasum.update(url)
  const shortLink = shasum.digest('hex').slice(0, 7)
  return db.one(`
    INSERT INTO links (url, shortlink, ownerid)
    VALUES ('${url}', '${shortLink}', ${ownerId})
    RETURNING *
  `)
}
