const Member = require("../../models/Member")
const { date, blood_type } = require ('../lib/utils')

module.exports = {
  index(request, response){
    Member.all( members => {
      return response.render('members/index', { members })
    })
  },

  create(request, response){
    return response.render('members/create')
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

      return response.render("members/edit", { member })
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