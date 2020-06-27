const express = require('express')
const nunjucks = require('nunjucks') 


const server = express()
const courses = require('./data') 


server.use(express.static('public')) 

server.set('view engine', 'njk')

nunjucks.configure('views', {
  express:server,
  autoescape:false
})


server.get('/', (require, response) => { 
  const about = {
    name: 'Rocketseat',
    avatar_url: 'https://avatars1.githubusercontent.com/u/28929274?s=280&v=4',
    description: 'As melhores tecnologias em programação, direto ao ponto e do jeito certo.',
    rocket: 'No meio de tanta informação e da quantidade de ferramentas que surgem todos os dias, você precisa de alguém que te leve na direção certa.',
    tech: 'Principais tecnologias utilizadas',
    technologies: [ 'Node.js', 'React', 'React Native'] 
  }

  return response.render('about', { about })
}) 
server.get('/content', (require, response) => {
  return response.render('content', { items: courses })
})

// Página não encontrada
server.use(function(require, response) {
  const error = { name: 'Página não encontrada'}

  response.status(404).render("not-found", { error });
}); 
 


server.listen(3000, () => {
  console.log('Server is running with success')
})  