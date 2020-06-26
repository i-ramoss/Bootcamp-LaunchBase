const express = require('express')
const nunjucks = require('nunjucks') 


const server = express()


server.use(express.static('public'))

server.set('view engine', 'njk')

nunjucks.configure('views', {
  express:server
})


server.get('/', (require, response) => {
  return response.render('about')
}) 
server.get('/content', (require, response) => {
  return response.render('content')
})

// Página não encontrada
server.use(function(require, response) {
  response.status(404).render("not-found");
}); 
 


server.listen(3000, () => {
  console.log('Server is running with success')
})  