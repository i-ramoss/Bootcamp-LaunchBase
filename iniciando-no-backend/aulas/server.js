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
  autoescape:false,
  noCache: true
}) 

// cria a rota '/' (rota principal)
server.get('/', (require, response) => {

  // define um objeto para ser utilizado no frontend
  const about = {
      avatar_url: 'https://avatars0.githubusercontent.com/u/45082049?s=460&u=bfd74e9c053f3fbad257bdddeca3260b3504d7e2&v=4',
      name: 'Ian Ramos',
      role: 'Estudante',
      description: 'Entusiasta em programação e desenvolvedor júnior full stack em aprendizado pela <a href="https://rocketseat.com.br" target="_blanck">Rocketseat',
      links: [ 
        { name: 'GitHub', url: 'https://github.com/i-ramoss' },
        { name: 'Linkedin', url: 'https://www.linkedin.com/in/ian-ramos/' }
      ]
    }
  
  // retorna a renderização da rota '/about'
  return response.render('about', { about })
})

// cria a rota '/studies'
server.get('/studies', (require, response) => {

  // retorna a renderização da rota studies e do objeto videos para o frontend
  return response.render('studies', { items: videos })
})

// cria a rota '/video' que irá redirecionar um vídeo de id específico para essa rota
server.get('/video', (require, response) => {

  // busca o parâmetro id no url do site e armazena na variável id
  const id = require.query.id

  // função filtra um url específico
  const video = videos.find(function(video) {
    return video.id == id
  })
  
  // se o id não existir, uma págin de vídeo não encontrado será exibida
  if (!video) 
    return response.send('Video not found!')

  // retorna o vídeo encontrado
  return response.render('video', { item: video })
})

// configura o servidor para ouvir na porta 3000
server.listen(5000, () => {
  console.log('Server is runningn')
}) 
