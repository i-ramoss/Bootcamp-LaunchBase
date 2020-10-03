const { age, date } = require ('../lib/utils')

module.exports = {
  index(request, response){
    return response.render('instructors/index')
  },

  create(request, response){
    return response.render('instructors/create')
  },

  post(request, response){
    const keys = Object.keys(request.body)

    for (key of keys) {
      if (request.body[key] == '')
        return response.send('Please, fill all fields!')
    }

    let {avatar_url, name, birth, gender, services} = request.body

    return
  },

  show(request, response){
    return
  },

  edit(request, response){
    return
  },

  put(request, response){
    const keys = Object.keys(request.body)

    for (key of keys) {
      if (request.body[key] == '')
        return response.send('Please, fill all fields!')
    }

    let {avatar_url, name, birth, gender, services} = request.body

    return
  },
  
  delete(request, response){
    return
  }
}