// a variável express adquire as funcionalidaeds do express
const express = require('express') 

// a variável nunjucks adquire as funcionalidaeds do nunjucks
const nunjucks = require('nunjucks') 

// executa as funcionalidades do servidor
const server = express()

// diz ao express para usar arquivos estáticos da página public
server.use(express.static('public'))

// configura a template engine para tudo que for njk
server.set('view engine', 'njk')

// configura a pasta que vai ser usada e a variável responsável pelo express
nunjucks.configure('views', {
  express:server
})

// cria a rota '/' (rota principal)
server.get('/', function(require, response) {

  // retorna a renderização da index
  return response.render('about')
})

// cria a rota '/studies'
server.get('/studies', function(require, response) {

  // retorna a renderização da index
  return response.render('studies')
})

// configura o servidor para ouvir na porta 3000
server.listen(3000, () => {
  console.log('Server is runningn')
})
