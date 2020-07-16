const express = require('express')

// o método Router é capaz de definir a variável desejada como controladora das rotas
const routes = express.Router()

routes.get('/', (require, response) => {

  // redirect: redireciona para a rota desejada
  return response.redirect('/teachers')
})

routes.get('/teachers', (require, response) => {
  return response.render('./teachers/index')
})

routes.get('/students', (require, response) => {
  return response.send('students')
})



module.exports = routes