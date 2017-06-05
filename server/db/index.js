const mongoose = require('mongoose')
mongoose.Promise = require('bluebird')
const env = process.env.NODE_ENV || 'development'
const dbUrl = process.env.DB_URL || `mongodb://localhost/lillink-${env}`

mongoose.connection.on('error', console.error.bind(console, 'connection error:'))
mongoose.connection.once('open', console.log.bind(console, `Connected to MongoDB url: ${dbUrl}`))

module.exports = mongoose
