const { unlinkSync } = require("fs")
const { hash } = require("bcryptjs")

const User = require("../models/User")
const Product = require("../models/Product")

const LoadProductService = require("../services/LoadProductService")

const { formatCpfCnpj, formatZipCode } = require("../../lib/utils")

module.exports = {
  registerForm(request, response) {
    return response.render("user/register")
  },

  async create(request, response) {
    try {
      let { name, email, password, cpf_cnpj, zip_code, address } = request.body

      password = await hash(password, 8)
      cpf_cnpj = cpf_cnpj.replace(/\D/g, "")
      zip_code = zip_code.replace(/\D/g, "")

      const userId = await User.create({
        name,
        email,
        password,
        cpf_cnpj,
        zip_code,
        address
      })

      request.session.userId = userId

      return response.redirect("/users")
    } 
    catch (err) {
      console.error(err)  
    }
  },

  async show(request, response) {
    try {
      const { user } = request

      user.cpf_cnpj = formatCpfCnpj(user.cpf_cnpj)
      user.zip_code = formatZipCode(user.zip_code)

      return response.render("user/index", { user })
    } 
    catch (err) {
      console.error(err)  
    }
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
      const { id } = request.body

      const products = await Product.findAll({ where: {user_id: id } })

      const allFilesPromise = products.map( product => Product.files(product.id))
      let promiseResults = await Promise.all(allFilesPromise)

      await User.delete(id)

      request.session.destroy()

      promiseResults.map( files => {
        files.map( file => {
          try {
            unlinkSync(file.path)
          } 
          catch (err) {
            console.error(err)
          }
        }) 
      })

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
  },

  async ads(request, response) {
    const products = await LoadProductService.load("products", {
      where: { user_id: request.session.userId }
    })

    return response.render("user/ads", { products })
  }
}