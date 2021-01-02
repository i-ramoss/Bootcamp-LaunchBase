const User = require("../models/User")

async function create(request, response, next) {
  let { email, cpf_cnpj, password, passwordRepeat } = request.body
  const keys = Object.keys(request.body)

  for (key of keys) {
    if (request.body[key] == "")
      return response.render("user/register", {
        user: request.body,
        error: "Please, fill all fields"
      })
    
  }

  cpf_cnpj = cpf_cnpj.replace(/\D/g, "")

  const user = await User.findOne({ 
    where: { email }, or: { cpf_cnpj } 
  })

  if (user) return response.render("user/register", {
    user: request.body,
    error: "User already registered!"
  })

  if (password != passwordRepeat) return response.render("user/register", {
    user: request.body,
    error: "Password Mismatch!"
  })

  next()
}

module.exports = {
  create
}