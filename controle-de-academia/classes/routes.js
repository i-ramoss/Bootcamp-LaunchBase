const express = require('express')

// o método Router é capaz de definir a variável desejada como controladora das rotas
const routes = express.Router()

routes.get('/', (require, response ) => {

  // redirect: redireciona para a rota desejada
  return response.redirect('/instructors')
})

routes.get('/instructors', (require, response ) => {
  return response.render('instructors/index')
})

routes.get('/members', (require, response ) => {
  return response.send('members')
})



module.exports = routes