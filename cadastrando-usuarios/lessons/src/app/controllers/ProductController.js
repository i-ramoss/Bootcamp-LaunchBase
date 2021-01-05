const { formatPrice, date } = require("../lib/utils")

const Category = require("../models/Category")
const Product = require("../models/Product")
const File = require("../models/File")

module.exports = {
  async create(request, response) {
    let results = await Category.all()
    const categories = results.rows

    return response.render("products/create.njk", { categories })
  },

  async post(request, response) {
    const keys = Object.keys(request.body)

    for (key of keys) {
      if (request.body[key] == "")
        return response.json({ err: "Please, fill all fields!" })
    }

    if(request.files.lenght === 0) return response.json("Please, send at least one image")

    request.body.user_id = request.session.userId

    let results = await Product.create(request.body)  
    const productId = results.rows[0].id

    const filesPromise = request.files.map( file => File.create({
      ...file,
      product_id: productId
    }))

    await Promise.all(filesPromise)

    return response.redirect(`/products/${productId}`)
  },

  async show(request, response) {
    let results = await Product.find(request.params.id)
    const product = results.rows[0]

    if(!product) return response.status(404).json({ err: "Product not found!" })

    const { month, day, hour, minutes } = date(product.updated_at)

    product.published = {
      day: `${day}/${month}`,
      hour: `${hour}h${minutes}`,
    }

    product.price = formatPrice(product.price)
    product.oldPrice = formatPrice(product.old_price)

    results = await Product.files(product.id)

    let files = results.rows.map( file => ({
      ...file,
      src: `${request.protocol}://${request.headers.host}${file.path.replace("public", "")}`
    }))

    return response.render("products/show.njk", { product, files })
  },

  async edit(request, response) {
    let results = await Product.find(request.params.id)  
    const product = results.rows[0]

    if (!product) return response.status(404).json({ err: "Product not found!"})

    product.price = formatPrice(product.price)
    product.old_price = formatPrice(product.old_price)

    results = await Category.all()
    const categories = results.rows

    results = await Product.files(product.id)
    let files = results.rows

    files = files.map( file => ({
      ...file,
      src: `${request.protocol}://${request.headers.host}${file.path.replace("public", "")}`
    }))

    return response.render("products/edit.njk", { product, categories, files })
  },

  async update(request, response) {
    const keys = Object.keys(request.body)

    for (key of keys) {
      if (request.body[key] == "" && key != "removed_files")
        return response.json({ err: "Please, fill all fields!" })
    }

    if (request.files.length != 0) {
      const newFilesPromise = request.files.map( file => File.create({
        ...file,
        product_id: request.body.id})
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

    request.body.price = request.body.price.replace(/\D/g, "")

    if (request.body.old_price != request.body.price) {
      const oldProduct = await Product.find(request.body.id) 

      request.body.old_price = oldProduct.rows[0].price
    }

    await Product.update(request.body)

    return response.status(200).redirect(`products/${request.body.id}`)
  },

  async delete(request, response) {
    await Product.delete(request.body.id)

    return response.status(204).redirect("/products/create")
  }
}