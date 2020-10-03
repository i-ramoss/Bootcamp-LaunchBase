const express = require('express')
const teachers = require('./app/controllers/teachers')
const students = require('./app/controllers/students')

const routes = express.Router()

routes.get('/', (require, response) => {
  return response.redirect('/teachers')
})

// teachers
routes.get('/teachers', teachers.painel)
routes.get('/teachers/create', teachers.create)
routes.get('/teachers/:id', teachers.show)
routes.get('/teachers/:id/edit', teachers.edit)
routes.post('/teachers', teachers.post)
routes.put('/teachers', teachers.update)
routes.delete('/teachers', teachers.delete)

// students
routes.get('/students', students.painel)
routes.get('/students/create', students.create)
routes.get('/students/:id', students.show)
routes.get('/students/:id/edit', students.edit)
routes.post('/students', students.post)
routes.put('/students', students.update)
routes.delete('/students', students.delete)


module.exports = routes