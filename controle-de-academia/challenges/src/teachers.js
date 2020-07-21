// módulo do node que trabalha com arquivos do sistema
const fs = require('fs')
const data = require('../data.json')

//create

// exporta a função pra raiz do projeto
exports.post = (require, response) => {

  // cria um array com o objeto da requisição
  const keys = Object.keys(require.body)
  
  // validação dos dados, confere se todos os dados foram preenchidos
  for (key of keys) {
    if (require.body[key] == '')
      return response.send('Please, fill in all fields')
  }

  let {avatar_url, name, birth, education, class_type, subject} = require.body

  // transforma a string de data do formulário em milissegundos
  birth = Date.parse(require.body.birth)

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
    subject,
    created_at
  })

  // escreve os dados da requisição num arquivo data.json
  fs.writeFile('data.json', JSON.stringify(data, null, 2), (err) => {
    if (err) return response.send('Write file error!')

    return response.redirect('/teachers')
  })
}