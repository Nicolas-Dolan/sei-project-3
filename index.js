const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const { dbURI } = require('./config/environment')

const router = require('./config/router')
const logger = require('./lib/logger')
const errorHandler = require('./lib/errorHandler')

const app = express()

require('dotenv').config()

// ! Connecting to the MongoDB
mongoose.connect(
  dbURI, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    if (err) return console.log(err)
    console.log('Mongo is connected!')
  }
)

app.use(express.static(`${__dirname}/dist`))

app.use(bodyParser.json())

app.use(logger)

app.use('/api', router)

app.use(errorHandler)

app.get('/*', (req, res) => res.sendFile(`${__dirname}/dist/index.html`))

app.listen(process.env.PORT, () => console.log(`Running on port ${process.env.PORT}`))

module.exports = app