const { formatCpfCnpj, formatZipCode } = require("../lib/utils")

const User = require("../models/User")

module.exports = {
  registerForm(request, response) {
    return response.render("user/register")
  },

  async create(request, response) {
    const userId = await User.create(request.body)

    request.session.userId = userId

    return response.redirect("/users")
  },

  async show(request, response) {
    const { user } = request

    user.cpf_cnpj = formatCpfCnpj(user.cpf_cnpj)
    user.zip_code = formatZipCode(user.zip_code)

    return response.render("user/index", { user })
  },

  async update(request, response) {
    try {
      let { name, email, cpf_cnpj, zip_code, address } = request.body
      const { user } = request

      cpf_cnpj = cpf_cnpj.replace(/\D/g, "")
      zip_code = zip_code.replace(/\D/g, "")

      await User.update(user.id, {
        name,
        email,
        cpf_cnpj,
        zip_code,
        address
      })

      return response.render("user/index", {
        user: request.body,
        success: "Account updated successfully!"
      })
    } 
    catch (err) {
      console.error(err)
      return response.render("user/index", {
        error: "Something went wrong!"
      })
    }
  },

  async delete(request, response) {
    try {
      await User.delete(request.body.id)
      
      request.session.destroy()

      return response.render("session/login", {
        success: "Account successfully deleted"
      })
    } 
    catch (err) {
      console.error(err)
      return response.render("user/index", {
        user: request.body,
        error: "Error trying to delete your account"
      })
    }
  }
}