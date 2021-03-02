const mailer = require("../../lib/mailer")
const Cart = require("../../lib/cart")

const User = require("../models/User")
const Order = require("../models/Order")

const LoadProductService = require("../services/LoadProductService")
const LoadOrderService = require("../services/LoadOrderService")

const email = (seller, product, buyer) => `
  <h2>Hi ${seller.name}</h2>
  <p>You have a new purchase order for your product.</p>
  <p>Product: ${product.name}</p>
  <p>Price: ${product.formattedPrice}</p>
  <p><br/><br/></p>
  <h3>Buyer details</h3>
  <p>Name: ${buyer.name}</p>
  <p>Email: ${buyer.email}</p>
  <p>Address: ${buyer.address}</p>
  <p>Zip Code: ${buyer.zip_code}</p>
  <p><br/><br/></p>
  <p><strong>Contatc the buyer to complete the purchase!</strong></p>
  <p><br/><br/></p>
  <p>Sincelery, Launchstore Team.</p>
`

module.exports = {
  async index(request, response) {
    const orders = await LoadOrderService.load("orders", { where: { buyer_id: request.session.userId } })

    return response.render("orders/index", { orders })
  },

  async create(request, response) {
    try {
      const buyer_id = request.session.userId

      const cart = Cart.init(request.session.cart)

      const createOrdersPromise = cart.items
        .filter( item => item.product.user_id != buyer_id)
        .map( async item => {
          let { product, price: total, quantity } = item
          const { price, id: product_id, user_id: seller_id } = product
          const status = "open"

          const order = await Order.create({
            seller_id,
            buyer_id,
            product_id,
            price,
            total,
            quantity,
            status
          })

          product = await LoadProductService.load("product", { where: { id: product.id }})

          const seller = await User.findOne({ where: { id: seller_id }})
    
          const buyer = await User.findOne({ where: { id: buyer_id }})
    
          await mailer.sendMail({
            to: seller.email,
            from: "no-reply@launchstore.com.br",
            subject: "New purchase order",
            html: email(seller, product, buyer)
          })

          return order
        })

      await Promise.all(createOrdersPromise)

      delete request.session.cart
      Cart.init()

      return response.render("orders/success")
    } 
    catch (err) {
      console.error(err)
      return response.render("orders/error")
    }
  },

  async sales(request, response) {
    const sales = await LoadOrderService.load("orders", { where: { seller_id: request.session.userId } })

    return response.render("orders/sales", { sales })
  }
}