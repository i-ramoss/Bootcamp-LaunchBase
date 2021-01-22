const Category = require("../models/Category")
const Product = require("../models/Product")
const File = require("../models/File")

const { formatPrice, date } = require("../lib/utils")

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

      const keys = Object.keys(request.body)

      for (key of keys) {
        if (request.body[key] == "")
          return response.json({ err: "Please, fill all fields!" })
      }

      if(request.files.lenght === 0) return response.json("Please, send at least one image")

      price = price.replace(/\D/g, "")

      const product_id = await Product.create(request.body.id, {
        category_id,
        user_id: request.session.userId,
        name,
        description,
        old_price: old_price || price,
        price,
        quantity,
        status: status || 1,
      })

      const filesPromise = request.files.map( file => File.create({
        ...file,
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
      const product = await Product.find(request.params.id)

      if(!product) return response.status(404).json({ err: "Product not found!" })

      const { month, day, hour, minutes } = date(product.updated_at)

      product.published = {
        day: `${day}/${month}`,
        hour: `${hour}h${minutes}`,
      }

      product.price = formatPrice(product.price)
      product.oldPrice = formatPrice(product.old_price)

      let files = await Product.files(product.id)

      files = files.map( file => ({
        ...file,
        src: `${request.protocol}://${request.headers.host}${file.path.replace("public", "")}`
      }))

      return response.render("products/show.njk", { product, files })
    } 
    catch (err) {
      console.error(err0)  
    }
  },

  async edit(request, response) {
    try {
      const product = await Product.find(request.params.id)  

      if (!product) return response.status(404).json({ err: "Product not found!"})

      product.price = formatPrice(product.price)
      product.old_price = formatPrice(product.old_price)

      const categories = await Category.findAll()

      let files = await Product.files(product.id)

      files = files.map( file => ({
        ...file,
        src: `${request.protocol}://${request.headers.host}${file.path.replace("public", "")}`
      }))

      return response.render("products/edit.njk", { product, categories, files })
    } 
    catch (err) {
      console.error(err)
    }
  },

  async update(request, response) {
    try {
      let { category_id, name, description, old_price, price, quantity, status, id } = request.body
      const keys = Object.keys(request.body)

      for (key of keys) {
        if (request.body[key] == "" && key != "removed_files")
          return response.json({ err: "Please, fill all fields!" })
      }

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

        old_price = oldProduct.rows[0].price
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
    await Product.delete(request.body.id)

    return response.status(204).redirect("/products/create")
  }
}