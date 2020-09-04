// módulo do node que trabalha com arquivos do sistema
const fs = request('fs')
const data = request('../../data.json')
const { age, date, graduation } = request('../utils')

// painel of teachers
exports.painel = (request, response) => {

  const newTeacher = data.teachers.map((teacher) => {
    const splitDiscipline = {
      ...teacher,
      disciplines: teacher.disciplines.split(',')
    }

    return splitDiscipline
  })

  return response.render('teachers/index', { teachers: newTeacher })
}


// create teacher
exports.create =  (request,response) => {
  return response.render('teachers/create')
}


//create teacher
exports.post = (request, response) => {

  // cria um array com o objeto da requisição
  const keys = Object.keys(request.body)
  
  // validação dos dados, confere se todos os dados foram preenchidos
  for (key of keys) {
    if (request.body[key] == '')
      return response.send('Please, fill in all fields')
  }

  let {avatar_url, name, birth, education, class_type, disciplines} = request.body

  // transforma a string de data do formulário em milissegundos
  birth = Date.parse(birth)

  // cria uma data do momento atual, a data é apresentada em milissegundos devido ao timestamp
  const created_at = Date.now()

  // cria uma chave única auto incrementável para cada student
  let id = 1
  const lastMember = data.members[data.members.length - 1]

  if (lastMember)
    id = lastMember.id + 1

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

    return response.redirect(`/teachers/${id}`)
  })
}
 
 
//show teacher
exports.show = (request, response) => {
  const { id } = request.params

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
exports.edit = (request,response) => {
  const { id } = request.params

  const foundTeacher = data.teachers.find(function(teacher) {
    return teacher.id == id
  })

  if (!foundTeacher) return response.send('Teacher not found')

  const teacher = {
    ...foundTeacher,
    birth: date(foundTeacher.birth).iso
  }

  return response.render('teachers/edit', { teacher })
}


// update teacher
exports.update = (request, response) => {
  const { id } = request.body
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
    ...request.body,
    birth: Date.parse(request.body.birth)
  }

  data.teachers[index] = teacher

  fs.writeFile('data.json', JSON.stringify(data, null, 2), (err) => {
    if(err) return response.send('Write file error!')

    return response.redirect(`/teachers/${id}`)
  })
}


// delete teacher
exports.delete = (request, response) => {
  const { id } = request.body

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