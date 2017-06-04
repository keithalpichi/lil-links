// require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const app = express()
const PORT = process.env.PORT || 8080
const HOST = process.env.HOST || 'localhost'
const ENV = process.env.NODE_ENV

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, '../public/')))

// app.use('/api', router)
app.get('*', (req, res) => res.sendFile(path.join(__dirname, '../public/index.html')))

if (!module.parent) {
  app.listen(PORT, HOST, () => {
    console.log(`Listening at: ${HOST}:${PORT} in ${ENV} environment`)
  })
}
