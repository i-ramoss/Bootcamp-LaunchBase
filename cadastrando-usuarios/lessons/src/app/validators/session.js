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

async function forgot(request, response, next) {
  const { email } = request.body

  try {
    let user = await User.findOne({ where: { email } })

    if (!user) return response.render("session/forgot-password", {
      user: request.body,
      error: "Email not registered!"
    })
    
    request.user = user

    next()
  } 
  catch (err) {
    console.error(err)
  }

}

module.exports = {
  login,
  forgot
}