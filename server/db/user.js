const db = require('./index')
const bcrypt = require('bcrypt-nodejs')
const util = require('bluebird')
const cipher = util.promisify(bcrypt.hash)
const compare = util.promisify(bcrypt.compare)

module.exports.selectUser = ({ id }) => db.oneOrNone(`SELECT * from users WHERE id = ${id}`)

module.exports.selectUserByEmail = ({ email }) => db.oneOrNone(`SELECT * FROM users WHERE email = '${email}'`)

module.exports.postUser = ({ username, email, password }) => {
  console.log('creating a new user with params ', username, email, password)
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
    return compare(givenPassword, savedPassword)
    .then((err, isMatch) => {
      const error = new Error('Password is invalid')
      if (err) { return reject(error) }
      return resolve(isMatch)
    })
  })
}
