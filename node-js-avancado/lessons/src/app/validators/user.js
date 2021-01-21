const { compare } = require("bcryptjs")

const User = require("../models/User")

function checkAllFields(body) {
  const keys = Object.keys(body)

  for (key of keys) {
    if (body[key] == "") {
      return {
        user: body,
        error: "Please, fill all fields"
      }
    }
  }
}

async function create(request, response, next) {
  const fillAllFields = checkAllFields(request.body)
  let { email, cpf_cnpj, password, passwordRepeat } = request.body

  if (fillAllFields) return response.render("user/register", fillAllFields)

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

async function show(request, response, next) {
  const { userId: id } = request.session
  const user = await User.findOne({ where: {id} })

  if (!user) return response.render("user/register", {
    error: "User not found!"
  })

  request.user = user

  next()
}

async function update(request, response, next) {
  const fillAllFields = checkAllFields(request.body)
  const { id, password } = request.body

  if (fillAllFields) return response.render("user/index", fillAllFields)

  if (!password) {
    return response.render("user/index", {
      user: request.body,
      error: "Enter your password to update your registration"
    })
  }

  const user = await User.findOne({ where: {id} })
  const passed = await compare(password, user.password)

  if (!passed) return response.render("user/index", {
    user: request.body,
    error: "Incorrect Password!"
  })

  request.user = user

  next()
}

module.exports = {
  create,
  show,
  update
}