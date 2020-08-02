// módulo do node que trabalha com arquivos do sistema
const fs = require('fs')
const data = require('../../data.json')
const { date, grade } = require('../utils')


// painel of students
exports.painel = (require, response) => {
  return response.render('students/index', { students: data.students })
}

// create student
exports.create =  (require,response) => {
  return response.render('students/create')
}

//create student
exports.post = (require, response) => {

  // cria um array com o objeto da requisição
  const keys = Object.keys(require.body)
  
  // validação dos dados, confere se todos os dados foram preenchidos
  for (key of keys) {
    if (require.body[key] == '')
      return response.send('Please, fill in all fields')
  }

  // transforma a string de data do formulário em milissegundos
  birth = Date.parse(require.body.birth)

  // cria uma chave única auto incrementável para cada student
  let id = 1
  const lastStudent = data.students[data.students.length - 1]

  if (lastStudent)
    id = lastStudent.id + 1

  // adiciona o objeto com os dados de um novo student ao vetor de students do data.json
  data.students.push({
    id,
    ...require.body,
    birth
  })

  // escreve os dados da requisição num arquivo data.json
  fs.writeFile('data.json', JSON.stringify(data, null, 2), (err) => {
    if (err) return response.send('Write file error!')

    return response.redirect(`/students/${id}`)
  })
}
 
//show student
exports.show = (require, response) => {
  const { id } = require.params

  const foundStudent = data.students.find(function(student) {
    return student.id == id
  }) 

  if (!foundStudent) return response.send('Student not found')

  const student = {

    // spread: espalha dentro do objeto student todas as informações do objeto foundStudent
    ...foundStudent,
    age: date(foundStudent.birth).birthDay,
    education: grade(foundStudent.education)
  }

  return response.render('students/show', { student })
}

// edit student
exports.edit = (require,response) => {
  const { id } = require.params

  const foundStudent = data.students.find(function(student) {
    return student.id == id
  })

  if (!foundStudent) return response.send('Student not found')

  const student = {
    ...foundStudent,
    birth: date(foundStudent.birth).iso
  }

  return response.render('students/edit', { student })
}

// update student
exports.update = (require, response) => {
  const { id } = require.body
  let index = 0

  const foundStudent = data.students.find((student, foundIndex) => {
    if (student.id == id) {
      index = foundIndex
      return true
    }
  })

  if(!foundStudent) return response.send('Student not found')

  const student = {
    ...foundStudent,
    ...require.body,
    birth: Date.parse(require.body.birth),
    id: Number(require.body.id)
  }

  data.students[index] = student

  fs.writeFile('data.json', JSON.stringify(data, null, 2), (err) => {
    if(err) return response.send('Write file error!')

    return response.redirect(`/students/${id}`)
  })
}

// delete student
exports.delete = (require, response) => {
  const { id } = require.body

  // filtra e deleta o professor encontrado
  const filteredStudent = data.students.filter((student) => {
    return student.id != id
  })

  data.students = filteredStudent

  fs.writeFile('data.json', JSON.stringify(data, null, 2), (err) => {
    if(err) return response.send('Write file error!')

    return response.redirect('/students')
  })
}