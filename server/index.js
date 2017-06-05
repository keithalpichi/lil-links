// require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const app = express()
const router = require('./routes')
const { apiRouter, shortLinkRouter } = router
const PORT = process.env.PORT || 8080
const HOST = process.env.HOST || 'localhost'
const ENV = process.env.NODE_ENV || 'development'

// app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, '../public/')))

app.use('/api', apiRouter)
app.get('/', (req, res) => res.sendFile(path.join(__dirname, '../public/index.html')))
app.get('/*', shortLinkRouter)

if (!module.parent) {
  const dbUrl = process.env.DB_URL || `mongodb://localhost/lillink-${ENV}`
  const db = require('./db/index')
  db.connect(dbUrl)

  app.listen(PORT, HOST, () => {
    console.log(`Listening at: ${HOST}:${PORT} in ${ENV} environment`)
  })
}
