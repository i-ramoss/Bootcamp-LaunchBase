const express = require('express') 
const nunjucks = require('nunjucks') 
const routes = require('./routes')
const methodOverride = require('method-override')

const server = express()

server.use(express.urlencoded({ extended: true }))
server.use(express.static('public'))
server.use(methodOverride('_method'))
server.use(routes)
server.set('view engine', 'njk')

nunjucks.configure('src/views', {
  express:server,
  autoescape:false,
  noCache: true,
  watch: true
}) 

server.listen(5000, () => {
  console.log('The server is running successfully on port 5000')
}) 
