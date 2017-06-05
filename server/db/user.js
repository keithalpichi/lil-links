const bcrypt = require('bcrypt-nodejs')
const mongoose = require('mongoose')
const bluebird = require('bluebird')
mongoose.Promise = bluebird
const cipher = bluebird.promisify(bcrypt.hash)

const userSchema = new mongoose.Schema({
  username: { type: String, required: 'Username is required', unique: true },
  email: {
    type: String,
    required: 'Email is required',
    validate: {
      validator: function (email) {
        return /^[a-zA-Z0-9.!#$%&’*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)
      },
      message: 'Email \'{VALUE}\' is not a valid email'
    }
  },
  password: { type: String, required: 'Password is required', minlength: [7, 'Password \'{VALUE}\' must be 7 characters in length minimum'] },
  admin: { type: Boolean, required: true, default: false },
  private: { type: Boolean, required: true, default: false },
  createdAt: { type: Date, required: true, default: Date.now }
})

userSchema.pre('save', function (next) {
  return cipher(this.password, null, null)
  .then(hash => {
    this.password = hash
    next()
  })
})

const User = mongoose.model('User', userSchema)

User.comparePassword = function (candidatePassword, savedPassword) {
  return new Promise(function (resolve, reject) {
    bcrypt.compare(candidatePassword, savedPassword, function (err, isMatch) {
      if (err) { return reject(err) }
      return resolve(isMatch)
    })
  })
}

module.exports = User
