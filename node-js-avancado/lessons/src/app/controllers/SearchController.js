const Product = require("../models/Product")

const { formatPrice } = require("../lib/utils")

module.exports = {
  async index(request, response) {
    try {
      let params = {}
      const { filter, category } = request.query

      if (!filter) return response.redirect("/")

      params.filter = filter

      if (category) params.category = category

      let products = await Product.search(params)

      async function getImage(productId) {
        let files = await Product.files(productId)
  
        files = files.map( file => `${request.protocol}://${request.headers.host}${file.path.replace("public", "")}`)
  
        return files[0]
      }

      const ProductsPromise = products.map( async product => {
        product.img = await getImage(product.id)
        product.oldPrice = formatPrice(product.old_price)
        product.price = formatPrice(product.price)
  
        return product
      })

      products = await Promise.all(ProductsPromise)

      const search = {
        term: request.query.filter,
        total: products.length
      }

      const categories = products.map( product => ({
        id: product.category_id,
        name: product.category_name
      })).reduce((categoriesFiltered, category) => {
        const found = categoriesFiltered.some(cat => cat.id == category.id)

        if (!found) categoriesFiltered.push(category)

        return categoriesFiltered
      }, [])

      return response.render("search/index", { products, search, categories })
    }
    catch (err) {
      console.error(err)
    }
  }
}