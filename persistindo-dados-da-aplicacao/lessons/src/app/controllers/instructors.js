const Instructor = require("../../models/Instructor")
const { age, date } = require ('../lib/utils')

module.exports = {
  index(request, response){
    let { filter, page, limit } = request.query

    page = page || 1
    limit = limit || 2
    let offset = limit * (page - 1)

    const params = {
      filter,
      page,
      limit,
      offset,
      callback(instructors) {
        if (instructors == "") return response.redirect("/instructors")

        const pagination = {
          total: Math.ceil(instructors[0].total / limit),
          page
        }

        return response.render('instructors/index', { instructors, pagination, filter })
      }
    }

    Instructor.paginate(params)
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