// o fs (file system) é um módulo do node que trabalha com os arquivos do sistema
const fs = require('fs')

const data = require('./data.json')
const { age, date } = require ('./utils')
//const { send } = require('process')


// show
exports.show = (require, response) => {

  // retira de dentro do req.params o id, transformando-o numa variável
  const { id } = require.params

  // tenta encontrar o instrutor de dentro do array de instrutores no data
  const foundInstructor = data.instructors.find(function(instructor) {
    return instructor.id == id
  })

  // instrutor não encontrado
  if (!foundInstructor) return response.send('Instructor not found')

  const instructor = {

    // spread: poe dentro do objeto tudo do foundInstructor, sobrescrevendo o que foi reescrito
    ...foundInstructor,
    age: age(foundInstructor.birth),
    services: foundInstructor.services.split(','),

    // formata a data baseado no idioma desejado
    created_at: new Intl.DateTimeFormat('en-US').format(foundInstructor.created_at)
  }

  // retorna o instrutor encontrado
  return response.render('instructors/show', { instructor } )
}


// create
exports.post = (require, response) => {

  //require.body
  //{ "avatar": "https://google.com", "name": "flora", "birth": "2013-11-28", "gender": "F", "services": "miseravi" } - Pega todos os valores do objeto, além das chaves

  // Object é um constructor: é uma função vai criar objeto
  // ["avatar", "name", "birth", "gender", "services"] - Criou um array com as chaves do objeto
  const keys = Object.keys(require.body)

  //validação dos dados, confere se todos os dados foram preenchidos
  for (key of keys) {
    
    // require.body.key == ''
    if (require.body[key] == '')
      return response.send('Please, fill all fields!')
  }

  // desestruturação do objeto do require.body
  let {avatar_url, name, birth, gender, services} = require.body

  // tratamento dos dados
  // transforma a string do req.body num formato em milissegundos e substitui
  birth = Date.parse(birth)

  // cria uma data do momento atual
  const created_at = Date.now()

  // adiciona e incrementa uma chave única npara os dados de cada instrutor
  const id = Number(data.instructors.length + 1)

  
  // organização dos dados para envio
  // adiciona o require.body ao array da chave instructors
  // []
  data.instructors.push({
    id,
    avatar_url,
    name,
    birth,
    gender,
    services,
    created_at
  }) // => [{...}]

  // escreve a requisição obtida num arquivo data.json e faz a validação dos dados
  // o método JSON.stringiy converte objetos JS para uma string JSON
  fs.writeFile('data.json', JSON.stringify(data, null, 2), (err) => {
    if (err) return response.send('Write file error')

    return response.redirect('/instructors')
  })
}


// edit
exports.edit = (require, response) => {

  // retira de dentro do req.params o id, transformando-o numa variável
  const { id } = require.params

  // tenta encontrar o instrutor de dentro do array de instrutores no data
  const foundInstructor = data.instructors.find(function(instructor) {
    return instructor.id == id
  })

  // instrutor não encontrado
  if (!foundInstructor) return response.send('Instructor not found')

  // instructor.birth = 093493499
  // date(instrucotor.birth)
  // return yyyy-mm-dd

  const instructor = {
    ...foundInstructor,
    birth: date(foundInstructor.birth)
  }

  return response.render('instructors/edit', { instructor })
}