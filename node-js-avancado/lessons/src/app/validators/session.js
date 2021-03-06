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

async function reset(request, response, next) {
  try {
    const { email, password, passwordRepeat, token } = request.body

    let user = await User.findOne({ where: { email } })

    if (!user) return response.render("session/password-reset", {
      user: request.body,
      token,
      error: "Email not registered!"
    })

    if (password != passwordRepeat) return response.render("session/password-reset", {
      user: request.body,
      token,
      error: "Password Mismatch!"
    })

    if (token != user.reset_token) return response.render("session/password-reset", {
      user: request.body,
      token,
      error: "Token invalid! Please request a new password recovery"
    })

    let now = new Date()
    now = now.setHours(now.getHours())

    if (now > user.reset_token_expires) return response.render("session/password-reset", {
      user: request.body,
      token,
      error: "Token expired! Please request a new password recovery"
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
  forgot,
  reset
}