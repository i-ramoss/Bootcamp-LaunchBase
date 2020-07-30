const express = require('express')
const teachers = require('./teachers')

// o método Router é capaz de definir a variável desejada como controladora das rotas
const routes = express.Router()

routes.get('/', (require, response) => {

  // redirect: redireciona para a rota desejada
  return response.redirect('/teachers')
})

// teachers

routes.get('/teachers', teachers.painel)

routes.get('/teachers/create', teachers.create)

// busca um professor pelo id
routes.get('/teachers/:id', teachers.show)

// rota de edição de um professor
routes.get('/teachers/:id/edit', teachers.edit)

// permite o envio dos dados do formulário
routes.post('/teachers', teachers.post)

// permite a atualização dos dados de um professor
routes.put('/teachers', teachers.update)

routes.delete('/teachers', teachers.delete)


// students

routes.get('/students', (require, response) => {
  return response.send('students')
})


module.exports = routes