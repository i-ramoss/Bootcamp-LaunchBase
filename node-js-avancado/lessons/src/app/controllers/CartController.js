const { addOne } = require("../../lib/cart")
const Cart = require("../../lib/cart")

const LoadProductsService = require("../services/LoadProductService")

module.exports = {
  async index(request, response) {
    try {
      let { cart } = request.session

      cart = Cart.init(cart)

      return response.render("cart/index", { cart })
    }
    catch (err) {
      console.error(err)
    }
  },

  async addOne(request, response) {
    const { id } = request.params
    let { cart } = request.session

    const product = await LoadProductsService.load("product", { where: { id } })
    
    request.session.cart = Cart.init(cart).addOne(product)

    return response.redirect("/cart")
  },

  removeOne(request, response) {
    const { id } = request.params
    let { cart } = request.session

    if (!cart) return response.redirect("/cart")

    request.session.cart = Cart.init(cart).removeOne(id)

    return response.redirect("/cart")
  },

  deleteProduct(request, response) {
    const { id } = request.params
    let { cart } = request.session

    if (!cart) return

    request.session.cart = Cart.init(cart).delete(id)

    return response.redirect("/cart")
  }
}