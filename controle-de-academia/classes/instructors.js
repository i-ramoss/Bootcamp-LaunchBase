// o fs (file system) é um módulo do node que trabalha com os arquivos do sistema
const fs = require('fs')

const data = require('./data.json')
const { send } = require('process')

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