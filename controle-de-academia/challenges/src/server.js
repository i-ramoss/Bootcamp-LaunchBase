// a variável express adquire as funcionalidaeds do express
const express = require('express') 

// a variável nunjucks adquire as funcionalidaeds do nunjucks
const nunjucks = require('nunjucks') 

// a variável routes adquire importa o arquivo routes.js pro servidor
const routes = require('./routes')

// executa as funcionalidades do servidor
const server = express()

// diz ao express para usar arquivos estáticos da página public
server.use(express.static('public'))

// midleware que utiliza o arquivo routes no servidor
server.use(routes)

// configura a template engine para tudo que for njk
server.set('view engine', 'njk')

// configura a pasta que vai ser usada e a variável responsável pelo express além de renderizar as saídas pro html do jeito que são
nunjucks.configure('src/views', {
  express:server,
  autoescape:false,
  noCache: true,
  watch: true
}) 


// configura o servidor para ouvir na porta 3000
server.listen(3000, () => {
  console.log('The server is running successfully on port 3000')
}) 
