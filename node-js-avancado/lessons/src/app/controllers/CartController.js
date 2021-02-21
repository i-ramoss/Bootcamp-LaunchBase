const Cart = require("../../lib/cart")

const LoadProductsService = require("../services/LoadProductService")

module.exports = {
  async index(request, response) {
    try {
      let { cart } = request.session

      const product = await LoadProductsService.load("product", { where: { id: 2} })

      cart = Cart.init(cart).addOne(product)

      return response.render("cart/index", { cart })
    }
    catch (err) {
      console.error(err)
    }
  }
}