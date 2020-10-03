const { date, grade } = require('../lib/utils')

module.exports = {
  painel(request, response) {
    return response.render('students/index')
  },

  create(request, response) { 
    return response.render('students/create') 
  },

  post(request, response) {
    const keys = Object.keys(request.body)
  
    for (key of keys) {
      if (request.body[key] == '')
        return response.send('Please, fill in all fields')
    }

    let {avatar_url, name, birth, education, class_type, disciplines} = request.body

    return
  },

  show(request, response) {
    return
  },

  edit(request, response) {
    return
  },

  update(request, response) {
    const keys = Object.keys(request.body)
  
    for (key of keys) {
      if (request.body[key] == '')
        return response.send('Please, fill in all fields')
    }

    let {avatar_url, name, birth, education, class_type, disciplines} = request.body

    return
  },

  delete(request, response) {
    return
  }
}