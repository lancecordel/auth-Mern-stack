const express = require('express')
const cors = require('cors')
// const logger = require('morgan')
const routes = require('./newRoutes')

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: false}))
app.use(cors())

// app.use(logger('dev'))

app.use('/', routes)

module.exports = app