const User = require("../models/User")

module.exports = {
  registerForm(request, response) {
    return response.render("user/register")
  },

  async create(request, response) {
    

    return response.json({ Confirm: "Passed!" })
  }
}