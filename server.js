const express = require('express')
const hbs = require('express-handlebars')
let router = require('./routes')

const server = express()

// Middleware
server.engine('hbs', hbs({
  defaultLayout: 'main',
  extname: 'hbs'
}))

server.set('view engine', 'hbs')
server.use(express.static('public'))
server.use(express.urlencoded({extended: false}))

server.use('/', router)

module.exports = server
