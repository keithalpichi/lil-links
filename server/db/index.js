const promise = require('bluebird')
const options = { promiseLib: promise }
const env = process.env.NODE_ENV || 'development'
const dbUrl = process.env.DATABASE_URL || `postgres://root:@localhost:5432/lil_link_${env}`
const pgp = require('pg-promise')(options)

module.exports = pgp(dbUrl)
