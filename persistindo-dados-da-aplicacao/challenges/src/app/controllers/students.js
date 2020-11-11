const Student = require("../../models/Student")
const { date, grade } = require("../lib/utils")


module.exports = {
  painel(request, response) {
    let { filter, page, limit } = request.query

    page = page || 1
    limit = limit || 2
    let offset = limit * (page - 1)

    const params = {
      filter,
      page,
      limit,
      offset,
      callback(students) {
        if (students == "") return response.redirect("/students")

        students.map( student => {
          return student.school_year = grade(student.school_year)
        })
        
        const pagination = {
          total: Math.ceil(students[0].total / limit),
          page
        }

        return response.render("students/index", { students, pagination, filter })
      }
    }

    Student.paginate(params)
  },

  create(request, response) { 
    Student.teacherSelectOptions( options => {
      return response.render('students/create', { teacherOptions: options }) 
    })
  },

  post(request, response) {
    const keys = Object.keys(request.body)
  
    for (key of keys) {
      if (request.body[key] == '')
        return response.json({error: "Please, fill in all fields"})
    }

    Student.create(request.body, student => {
      return response.redirect(`/students/${student.id}`)
    })
  },

  show(request, response) {
    Student.find(request.params.id, student => {
      if(!student) return response.json({error: "Student not found!"})

      student.age = date(student.birth_date).birthDay
      student.school_year = grade(student.school_year)

      return response.render("students/show", { student })
    })
  },

  edit(request, response) {
    Student.find(request.params.id, student => {
      if(!student) return response.json({error: "Student not found!"})

      student.birth_date = date(student.birth_date).iso

      Student.teacherSelectOptions( options => {
        return response.render('students/edit', { student, teacherOptions: options }) 
      })
    })
  },

  update(request, response) {
    const keys = Object.keys(request.body)
  
    for (key of keys) {
      if (request.body[key] == '')
        return response.json({error: "Please, fill in all fields"})
    }

    Student.update(request.body, () => {
      return response.redirect(`students/${request.body.id}`)
    })
  },

  delete(request, response) {
    Student.delete(request.body.id, () => {
      return response.redirect("/students")
    })
  }
}