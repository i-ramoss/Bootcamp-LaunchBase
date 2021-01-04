const { compare } = require("bcryptjs")

const User = require("../models/User")

async function login(request, response, next) {
  const { email, password } = request.body

  const user = await User.findOne({ where: {email} })

  if (!user) return response.render("session/login", {
    user: request.body,
    error: "User not registered!"
  })

  const passed = await compare(password, user.password)

  if (!passed) return response.render("session/login", {
    user: request.body,
    error: "Incorrect Password!"
  })

  request.user = user

  next()
}

module.exports = {
  login
}