const Teacher = require("../../models/Teacher")
const { age, date, graduation  } = require("../lib/utils")


module.exports = {
  painel(request, response) {
    let { filter, page, limit } = request.query

    page = page || 1
    limit = limit || 2
    let offset = limit * (page-1)

    const params = {
      filter,
      page,
      limit,
      offset,
      callback(teachers) {
        if (teachers == "") return response.redirect("/teachers")

        teachers.map( teacher => {
          return teacher.disciplines = teacher.subjects_taught.split(",")
        })
        
        const pagination = {
          total: Math.ceil(teachers[0].total / limit),
          page
        }

        return response.render('teachers/index', { teachers, pagination, filter })
      } 
    }

    Teacher.paginate(params)
  },

  create(request, response) { 
    return response.render('teachers/create') 
  },

  post(request, response) {
    const keys = Object.keys(request.body)
  
    for (key of keys) {
      if (request.body[key] == '')
        return response.json({err: "Please, fill in all fields"})
    }

    Teacher.create(request.body, teacher => {
      return response.redirect(`/teachers/${teacher.id}`)
    })
  },

  show(request, response) {
    Teacher.find(request.params.id, teacher => {
      if(!teacher) return response.json({error: "Teacher not found!"})

      teacher.age = age(teacher.birth_date)
      teacher.education_level = graduation(teacher.education_level)
      teacher.disciplines = teacher.subjects_taught.split(",")
      teacher.created_at = date(teacher.created_at).format

      return response.render("teachers/show", { teacher })
    })
  },

  edit(request, response) {
    Teacher.find(request.params.id, teacher => {
      if(!teacher) return response.json({error: "Teacher not found!"})

      teacher.birth_date = date(teacher.birth_date).iso
  
      return response.render("teachers/edit", { teacher })
    })
  },

  update(request, response) {
    const keys = Object.keys(request.body)
  
    for (key of keys) {
      if (request.body[key] == '')
        return response.send('Please, fill in all fields')
    }

    Teacher.update(request.body, () => {
      return response.redirect(`teachers/${request.body.id}`)
    })
  },

  delete(request, response) {
    Teacher.delete(request.body.id, () => {
      return response.redirect("/teachers")
    })
  }
}
