const crypto = require("crypto")
const mailer = require("../lib/mailer")

const User = require("../models/User")

module.exports = {
  loginForm(request, response) {
    return response.render("session/login")
  },
  
  login(request, response) {
    request.session.userId = request.user.id

    return response.redirect("/users")
  },

  logout(request, response) {
    request.session.destroy();

    return response.redirect("/")
  },

  forgotForm(request, response) {
    return response.render("session/forgot-password")
  },

  async forgot(request, response) {
    try {
      const user = request.user
      const token = crypto.randomBytes(20).toString("hex")

      let now = new Date()
      now = now.setHours(now.getHours() + 1)

      await User.update(user.id, {
        reset_token: token,
        reset_token_expires: now
      })

      await mailer.sendMail({
        to: user.email,
        from: "no-reply@launchstore.com.br",
        subject: "Password Recovery",
        html: `
          <h2>Lost the key?</h2>
          <p>Don't worry! Click the link below to recover your password.</p>
          <p>
            <a href="http://localhost:3000/users/password-reset?token=${token}" target="_blank">
              RECOVER PASSWORD
            </a>
          </p>
        `
      })

      return response.render("session/forgot-password", {
        succes: "Check your email to reset your password!"
      })
    } 
    catch (err) {
      console.error(err)
      return response.render("session/forgot-password", {
        error: "Unexpected error, try again!"
      })
    }
  },

  resetForm(request, response) {
    return response.render("session/password-reset", { token: request.query.token })
  },

  reset(request, response) {
    const { email, password, passwordRepeat, token } = request.body

    try {
      // search for user

      // check that passowards match

      // check if the tokens match

      // verify that the token has not expired

      // create a new password hash

      // update the user

      // warns the user thar he has a new password      
    } 
    catch (error) {
      console.error(err)
      return response.render("session/password-reset", {
        error: "Unexpected error, try again!"
      })
    }
  }
}