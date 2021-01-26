const Product = require("../models/Product")

const LoadProductService = require("../services/LoadProductService")

module.exports = {
  async index(request, response) {
    try {
      let { filter, category } = request.query

      if (!filter || filter.toLowerCase() == "all the store") filter = null

      let products = await Product.search({ filter, category })

      const productsPromise = products.map(LoadProductService.format)

      products = await Promise.all(productsPromise)

      const search = {
        term: filter || "All the Store",
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