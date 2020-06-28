const express = require('express')
const nunjucks = require('nunjucks') 


const server = express()
const courses = require('./data') 


server.use(express.static('public')) 

server.set('view engine', 'njk')

nunjucks.configure('views', {
  express:server,
  autoescape:false,
  noCache: true
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

server.get('/courses', (require, response) => {
  return response.render('courses', { items: courses })
})

server.get('/courses/:id', (require, response) => {
  const id = require.params.id 

  const course = courses.find((course) => {
    return course.id == id
  })

  if(!course) {
    const error = { name: 'Curso não encontrado'}
    return response.status(404).render('not-found', { error })
  }

  return response.render('course', { item: course })
})

// Página não encontrada
server.use(function(require, response) {
  const error = { name: 'Página não encontrada'}

  response.status(404).render('not-found', { error })
})
 


server.listen(3000, () => {
  console.log('The server is running successfully on port 3000')
})  