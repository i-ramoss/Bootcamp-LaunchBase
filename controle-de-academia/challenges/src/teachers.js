// módulo do node que trabalha com arquivos do sistema
const fs = require('fs')
const data = require('../data.json')
const { age, date, graduation } = require('./utils')

// painel of teachers
exports.painel = (require, response) => {
  const teachers = Object(data.teachers)

  console.log(teachers)
  
  return response.render('teachers/index', { teachers: teachers })
}


//create teacher
exports.post = (require, response) => {

  // cria um array com o objeto da requisição
  const keys = Object.keys(require.body)
  
  // validação dos dados, confere se todos os dados foram preenchidos
  for (key of keys) {
    if (require.body[key] == '')
      return response.send('Please, fill in all fields')
  }

  let {avatar_url, name, birth, education, class_type, disciplines} = require.body

  // transforma a string de data do formulário em milissegundos
  birth = Date.parse(birth)

  // cria uma data do momento atual, a data é apresentada em milissegundos devido ao timestamp
  const created_at = Date.now()

  // cria uma chave única auto incrementável pra cada teacher
  const id = Number(data.teachers.length+1)

  // adiciona o objeto ao vetor de teachers do data.json
  data.teachers.push({
    id,
    avatar_url,
    name,
    birth,
    education,
    class_type,
    disciplines,
    created_at
  })

  // escreve os dados da requisição num arquivo data.json
  fs.writeFile('data.json', JSON.stringify(data, null, 2), (err) => {
    if (err) return response.send('Write file error!')

    return response.redirect('/teachers')
  })
}
 
 
//show teacher
exports.show = (require, response) => {
  const { id } = require.params

  const foundTeacher = data.teachers.find(function(teacher) {
    return teacher.id == id
  })

  if (!foundTeacher) return response.send('Teacher not found')

  const teacher = {

    // spread: espalha dentro do objeto teacher todas as informações do objeto foundTeacher
    ...foundTeacher,
    age: age(foundTeacher.birth),
    education: graduation(foundTeacher.education),
    disciplines: foundTeacher.disciplines.split(','),
    created_at: Intl.DateTimeFormat('en-US').format(foundTeacher.created_at)
  }

  return response.render('teachers/show', { teacher })
}


// edit teacher
exports.edit = (require,response) => {
  const { id } = require.params

  const foundTeacher = data.teachers.find(function(teacher) {
    return teacher.id == id
  })

  if (!foundTeacher) return response.send('Teacher not found')

  const teacher = {
    ...foundTeacher,
    birth: date(foundTeacher.birth)
  }

  return response.render('teachers/edit', { teacher })
}


// update teacher
exports.update = (require, response) => {
  const { id } = require.body
  let index = 0

  const foundTeacher = data.teachers.find((teacher, foundIndex) => {
    if (teacher.id == id) {
      index = foundIndex
      return true
    }
  })

  if(!foundTeacher) return response.send('Teacher not found')

  const teacher = {
    ...foundTeacher,
    ...require.body,
    birth: Date.parse(require.body.birth)
  }

  data.teachers[index] = teacher

  fs.writeFile('data.json', JSON.stringify(data, null, 2), (err) => {
    if(err) return response.send('Write file error!')

    return response.redirect(`/teachers/${id}`)
  })
}


// delete teacher
exports.delete = (require, response) => {
  const { id } = require.body

  // filtra e deleta o professor encontrado
  const filteredTeacher = data.teachers.filter((teacher) => {
    return teacher.id != id
  })

  data.teachers = filteredTeacher

  fs.writeFile('data.json', JSON.stringify(data, null, 2), (err) => {
    if(err) return response.send('Write file error!')

    return response.redirect('/teachers')
  })
}