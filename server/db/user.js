const db = require('./index')
const bcrypt = require('bcrypt-nodejs')
const util = require('bluebird')
const cipher = util.promisify(bcrypt.hash)

module.exports.selectUser = ({ id }) => db.oneOrNone(`SELECT * from users WHERE id = ${id}`)

module.exports.selectUserByEmail = ({ email }) => db.oneOrNone(`SELECT * FROM users WHERE email = '${email}'`)

module.exports.postUser = ({ username, email, password }) => {
  return cipher(password, null, null)
  .then(hashedPassword => {
    return db.oneOrNone(`
      INSERT INTO users (username, email, password)
      VALUES ('${username}', '${email}', '${hashedPassword}')
      ON CONFLICT
      DO NOTHING
      RETURNING *
    `)
  })
}

module.exports.comparePassword = (givenPassword, savedPassword) => {
  return new Promise((resolve, reject) => {
    return bcrypt.compare(givenPassword, savedPassword, (err, isMatch) => {
      if (err) {
        const error = new Error('Password is invalid')
        return reject(error)
      }
      return resolve(isMatch)
    })
  })
}
