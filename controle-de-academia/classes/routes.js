const express = require('express')
const instructors = require('./controllers/instructors')
const members = require('./controllers/members')

// o método Router é capaz de definir a variável desejada como controladora das rotas
const routes = express.Router()

routes.get('/', (require, response ) => {

  // redirect: redireciona para a rota desejada
  return response.redirect('/instructors')
})

// instructors

routes.get('/instructors', instructors.index)

routes.get('/instructors/create', instructors.create)

// rota que permite a busca pelo id através do parâmetro na requisição
routes.get('/instructors/:id', instructors.show)

// rota de edição dos campos de instrutor
routes.get('/instructors/:id/edit', instructors.edit)

// o método http POST é o responsável por criar um novo resource com os dados enviados
routes.post('/instructors', instructors.post)

// o método http PUT é o responsável por atualizar um resource existente a partir de uma requisição do body
routes.put('/instructors', instructors.put)

routes.delete('/instructors', instructors.delete)



// members

routes.get('/members', members.index)

routes.get('/members/create', members.create)

// rota que permite a busca pelo id através do parâmetro na requisição
routes.get('/members/:id', members.show)

// rota de edição dos campos de membros

routes.get('/members/:id/edit', members.edit)

// o método http POST é o responsável por criar um novo resource com os dados enviados
routes.post('/members', members.post)

// o método http PUT é o responsável por atualizar um resource existente a partir de uma requisição do body
routes.put('/members', members.put)

routes.delete('/members', members.delete)


module.exports = routes