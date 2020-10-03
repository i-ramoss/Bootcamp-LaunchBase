const { date, blood_type } = require ('../lib/utils')

module.exports = {
  index(request, response){
    return response.render('members/index')
  },

  create(request, response){
    return response.render('members/create')
  },

  post(request, response){
    const keys = Object.keys(request.body)

    for (key of keys) {
      if (request.body[key] == '')
        return response.send('Please, fill all fields!')
    }

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

    return
  },
  
  delete(request, response){
    return
  }
}