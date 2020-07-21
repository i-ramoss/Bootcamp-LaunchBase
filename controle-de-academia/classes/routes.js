const express = require('express')
const instructors = require('./instructors')

// o método Router é capaz de definir a variável desejada como controladora das rotas
const routes = express.Router()

routes.get('/', (require, response ) => {

  // redirect: redireciona para a rota desejada
  return response.redirect('/instructors')
})

routes.get('/instructors', (require, response ) => {
  return response.render('instructors/index')
})

routes.get('/instructors/create', (require, response) => {
  return response.render('instructors/create')
})

// o método http POST é o responsável por enviar os dados de um formulário no corpo da mensagem HTTP
routes.post('/instructors', instructors.post)

routes.get('/members', (require, response ) => {
  return response.send('members')
})


module.exports = routes