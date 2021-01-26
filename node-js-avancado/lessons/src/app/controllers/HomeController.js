const LoadProductService = require("../services/LoadProductService")

module.exports = {
  async index(request, response) {
    try {
      const allProducts = await LoadProductService.load("products")
      const products = allProducts.filter( (product, index) => index > 2 ? false : true)
    
      return response.render("home/index", { products })
    }
    catch (err) {
      console.error(err)
    }
  }
}