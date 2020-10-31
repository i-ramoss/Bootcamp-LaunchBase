const Member = require("../../models/Member")
const { date, blood_type } = require ('../lib/utils')

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
      callback(members) {
        if (members == "") return response.redirect("/members")

        const pagination = {
          total: Math.ceil(members[0].total / limit),
          page
        }

        return response.render('members/index', { members, pagination, filter })
      }
    }

    Member.paginate(params) 
  },

  create(request, response){
    Member.instructorsSelectOptions( options => {
      return response.render('members/create', { instructorOptions: options })
    })
  },

  post(request, response){
    const keys = Object.keys(request.body)

    for (key of keys) {
      if (request.body[key] == '') 
        return response.json({error: "Please, fill all fields!"})
    }

    Member.create(request.body, member => {
      return response.redirect(`/members/${member.id}`)
    })
  },

  show(request, response){
    Member.find(request.params.id, member => {
      if(!member) return response.json({error: "Member not found!"})

      member.birth = date(member.birth).birthDay
      member.blood = blood_type(member.blood)
      
      return response.render("members/show", { member })
    })
  },

  edit(request, response){
    Member.find(request.params.id, member => {
      if(!member) return response.json({error: "Member not found!"})

      member.birth = date(member.birth).iso

      Member.instructorsSelectOptions( options => {
        return response.render('members/edit', { member, instructorOptions: options })
      })
    })
  },

  put(request, response){
    const keys = Object.keys(request.body)

    for (key of keys) {
      if (request.body[key] == '')
        return response.json({error: "Please, fill all fields!"})
    }

    Member.update(request.body, () => {
      return response.redirect(`members/${request.body.id}`)
    })
  },
  
  delete(request, response){
    Member.delete(request.body.id, () => {
      return response.redirect("/members")
    })
  }
}