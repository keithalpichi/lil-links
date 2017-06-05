const crypto = require('crypto')
const mongoose = require('mongoose')
const bluebird = require('bluebird')
mongoose.Promise = bluebird

const linkSchema = new mongoose.Schema({
  ownerId: { type: Number, required: true },
  url: { type: String, required: 'Url is required', unique: true },
  shortLink: { type: String, unique: true },
  createdAt: { type: Date, required: true, default: Date.now },
  visits: { type: Number, default: 0 }
})

linkSchema.pre('save', function (next) {
  let shasum = crypto.createHash('sha1')
  shasum.update(this.url)
  this.shortLink = shasum.digest('hex').slice(0, 7)
  next()
})

const Link = mongoose.model('Link', linkSchema)

module.exports = Link
