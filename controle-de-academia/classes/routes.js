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

// rota que permite a busca pelo id através do parâmetro na requisição
routes.get('/instructors/:id', instructors.show)

// rota de edição dos campos de instrutor
routes.get('/instructors/:id/edit', instructors.edit)

// o método http POST é o responsável por criar um novo resource com os dados enviados
routes.post('/instructors', instructors.post)

// o método http PUT é o responsável por atualizar um resource existente a partir de uma requisição do body
routes.put('/instructors', instructors.put)

routes.delete('/instructors', instructors.delete)

routes.get('/members', (require, response ) => {
  return response.send('members')
})


module.exports = routes