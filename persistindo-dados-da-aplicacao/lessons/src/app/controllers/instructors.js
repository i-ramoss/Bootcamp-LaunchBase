const Instructor = require("../../models/Instructor")
const { age, date } = require ('../lib/utils')

module.exports = {
  index(request, response){
    const { filter } = request.query

    if (filter) {
      Instructor.findBy(filter, instructors => {
        return response.render('instructors/index', { instructors, filter })
      })

    } else {
        Instructor.all( instructors => {
          return response.render('instructors/index', { instructors })
        })
    }
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

    Instructor.create(request.body, instructor => {
      return response.redirect(`/instructors/${instructor.id}`)
    })
  },

  show(request, response){
    Instructor.find(request.params.id, instructor => {
      if(!instructor) return response.json({error: "Instructor not found!"})

      instructor.age = age(instructor.birth)
      instructor.services = instructor.services.split(",")
      instructor.created_at = date(instructor.created_at).format

      return response.render("instructors/show", { instructor })
    })
  },

  edit(request, response){
    Instructor.find(request.params.id, instructor => {
      if(!instructor) return response.json({error: "Instructor not found!"})

      instructor.birth = date(instructor.birth).iso

      return response.render("instructors/edit", { instructor })
    })
  },

  put(request, response){
    const keys = Object.keys(request.body)

    for (key of keys) {
      if (request.body[key] == '')
        return response.send('Please, fill all fields!')
    }

    Instructor.update(request.body, () => {
      return response.redirect(`instructors/${request.body.id}`)
    })
  },
  
  delete(request, response){
    Instructor.delete(request.body.id, () => {
      return response.redirect("/instructors")
    })
  }
}