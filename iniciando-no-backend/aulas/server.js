// a variável express adquire as funcionalidaeds do express
const express = require('express') 

// a variável nunjucks adquire as funcionalidaeds do nunjucks
const nunjucks = require('nunjucks') 

// executa as funcionalidades do servidor
const server = express()

// importa os dados do arquivo data.js
const videos = require('./data')

// diz ao express para usar arquivos estáticos da página public
server.use(express.static('public'))

// configura a template engine para tudo que for njk
server.set('view engine', 'njk')

// configura a pasta que vai ser usada e a variável responsável pelo express além de renderizar as saídas pro html do jeito que são
nunjucks.configure('views', {
  express:server,
  autoescape:false
})

// cria a rota '/' (rota principal)
server.get('/', function(require, response) {

  // define um objeto para ser utilizado no frontend
  const about = {
      avatar_url: 'https://avatars0.githubusercontent.com/u/45082049?s=460&u=bfd74e9c053f3fbad257bdddeca3260b3504d7e2&v=4',
      name: 'Ian Ramos',
      role: 'Estudante',
      description: 'Entusiasta em programação e desenvolvedor júnior full stack em aprendizado pela <a href="https://rocketseat.com.br" target="_blanck">Rocketseat'
    }
  
  // retorna a renderização da rota about
  return response.render('about', { about })
})

// cria a rota '/studies'
server.get('/studies', function(require, response) {

  // retorna a renderização da rota studies e do objeto videos para o frontend
  return response.render('studies', { items: videos })
})

// configura o servidor para ouvir na porta 3000
server.listen(3000, () => {
  console.log('Server is runningn')
})
