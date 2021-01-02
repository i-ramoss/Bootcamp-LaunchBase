const User = require("../models/User")

async function create(request, response, next) {
  let { email, cpf_cnpj, password, passwordRepeat } = request.body
  const keys = Object.keys(request.body)

  for (key of keys) {
    if (request.body[key] == "")
      return response.json({ err: "Please, fill all fields!" })
  }

  cpf_cnpj = cpf_cnpj.replace(/\D/g, "")

  const user = await User.findOne({ 
    where: { email }, or: { cpf_cnpj } 
  })

  if (user) return response.json({ err: "This user already exists" })

  if (password != passwordRepeat) return response.json({ err: "Password Mismatch" })

  next()
}

module.exports = {
  create
}