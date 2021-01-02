const User = require("../models/User")

module.exports = {
  registerForm(request, response) {
    return response.render("user/register")
  },

  async create(request, response) {
    const userId = await User.create(request.body)

    return response.redirect("/users")
  },

  async show(request, response) {
    return response.json({ confirm: "Registered" })
  }
}