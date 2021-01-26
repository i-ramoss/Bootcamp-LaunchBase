const { unlinkSync } = require("fs")

const Category = require("../models/Category")
const Product = require("../models/Product")
const File = require("../models/File")

const LoadProductService = require("../services/LoadProductService")

module.exports = {
  async create(request, response) {
    try {
      const categories = await Category.findAll()
  
      return response.render("products/create", { categories })
    } 
    catch (err) {
      console.error(err)  
    }
  },

  async post(request, response) {
    try {
      let { category_id, name, description, old_price, price, quantity, status } = request.body

      price = price.replace(/\D/g, "")

      const product_id = await Product.create({
        category_id,
        user_id: request.session.userId,
        name,
        description,
        old_price: old_price || price,
        price,
        quantity,
        status: status || 1
      })

      const filesPromise = request.files.map( file => File.create({
        name: file.filename,
        path: file.path,
        product_id
      }))

      await Promise.all(filesPromise)

      return response.redirect(`/products/${product_id}`)
    } 
    catch (err) {
      console.error(err)  
    }
  },

  async show(request, response) {
    try {
      const product = await LoadProductService.load("product", {
        where: { id: request.params.id }
      })

      return response.render("products/show.njk", { product, files: product.files })
    } 
    catch (err) {
      console.error(err)  
    }
  },

  async edit(request, response) {
    try {
      const product = await LoadProductService.load("product", {
        where: { id: request.params.id }
      })  

      const categories = await Category.findAll()

      return response.render("products/edit.njk", { product, categories })
    } 
    catch (err) {
      console.error(err)
    }
  },

  async update(request, response) {
    try {
      let { category_id, name, description, old_price, price, quantity, status, id } = request.body

      if (request.files.length != 0) {
        const newFilesPromise = request.files.map( file => File.create({
          ...file,
          product_id: id})
        )

        await Promise.all(newFilesPromise)
      }

      if (request.body.removed_files) {
        const removedFiles = request.body.removed_files.split(",")
        const lastIndex = removedFiles.length - 1

        removedFiles.splice(lastIndex, 1)

        const removedFilesPromise = removedFiles.map( id => File.delete(id))

        await Promise.all(removedFilesPromise)
      }

      price = price.replace(/\D/g, "")

      if (old_price != price) {
        const oldProduct = await Product.find(id) 

        old_price = oldProduct.price
      }

      await Product.update(id, {
        category_id,
        name,
        description,
        old_price,
        price,
        quantity,
        status
      })

      return response.status(200).redirect(`products/${id}`)
    } 
    catch (err) {
      console.error(err)
    }
  },

  async delete(request, response) {
    const { id } = request.body

    const files = await Product.files(id) 

    await Product.delete(id)

    files.map( file => {
      try {
        unlinkSync(file.path)
      } 
      catch (err) {
        console.error(err)
      }
    }) 

    return response.status(204).redirect("/products/create")
  }
}