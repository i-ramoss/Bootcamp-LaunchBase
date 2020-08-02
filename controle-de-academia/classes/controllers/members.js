// o fs (file system) é um módulo do node que trabalha com os arquivos do sistema
const fs = require('fs')

const data = require('../data.json')
const { date, blood_type } = require ('../utils')


// painel
exports.index = (require, response ) => {
  return response.render('members/index', { members: data.members })
}

//create
exports.create = (require, response) => {
  return response.render('members/create')
}

// create (post)
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

  // tratamento dos dados
  // transforma a string do req.body num formato em milissegundos e substitui
  birth = Date.parse(require.body.birth)

  // adiciona e incrementa uma chave única para os dados de cada membro
  let id = 1
  const lastMember = data.members[data.members.length - 1]

  if (lastMember)
    id = lastMember.id + 1
  
  // organização dos dados para envio
  // adiciona o require.body ao array de members
  // []
  data.members.push({
    id,
    ...require.body,
    birth,
  }) // => [{...}]

  // escreve a requisição obtida num arquivo data.json e faz a validação dos dados
  // o método JSON.stringiy converte objetos JS para uma string JSON
  fs.writeFile('data.json', JSON.stringify(data, null, 2), (err) => {
    if (err) return response.send('Write file error')

    return response.redirect(`/members/${id}`)
  })
}

// show
exports.show = (require, response) => {

  // retira de dentro do req.params o id, transformando-o numa variável
  const { id } = require.params

  // tenta encontrar o membro de dentro do array de membroes no data
  const foundMember = data.members.find(function(member) {
    return member.id == id
  })

  // membro não encontrado
  if (!foundMember) return response.send('Member not found')

  const member = {

    // spread: poe dentro do objeto tudo do foundMember, sobrescrevendo o que foi reescrito
    ...foundMember,
    birth: date(foundMember.birth).birthDay,
    blood: blood_type(foundMember.blood)
  }

  // retorna o membro encontrado
  return response.render('members/show', { member } )
}

// edit
exports.edit = (require, response) => {

  // retira de dentro do req.params o id, transformando-o numa variável
  const { id } = require.params

  // tenta encontrar o membro de dentro do array de membroes no data
  const foundMember = data.members.find(function(member) {
    return member.id == id
  })

  // membro não encontrado
  if (!foundMember) return response.send('Member not found')

  // member.birth = 093493499
  // date(member.birth)
  // return yyyy-mm-dd

  const member = {
    ...foundMember,
    birth: date(foundMember.birth).iso
  }

  return response.render('members/edit', { member })
}

// update
exports.put = (require, response) => {
  const { id } = require.body
  let index = 0

  const foundMember = data.members.find((member, foundIndex) => {
    if (member.id == id) {
      index = foundIndex
      return true
    }
  })

  if (!foundMember) return response.send('Member not found!')

  const member = {
    ...foundMember,
    ...require.body,
    birth: Date.parse(require.body.birth),
    id: Number(require.body.id)
  }

  data.members[index] = member

  fs.writeFile('data.json', JSON.stringify(data, null, 2), (err) => {
    if(err) return response.send('Write file error!')

  return response.redirect(`/members/${id}`)

  })
}

// delete 
exports.delete = (require, response) => {
  const { id } = require.body 
  const filteredMembers = data.members.filter((member) => {

    // se retornar true, poe dentro do array filteredInstrucors, caso false, tira do array
    return member.id != id
  })

  data.members = filteredMembers

  fs.writeFile('data.json', JSON.stringify(data, null, 2), (err) => {
    if(err) return response.send('Write file error!')

    return response.redirect('/members')
  })
}