const mailer = require("../../lib/mailer")
const { formatPrice, date } = require("../../lib/utils")
const Cart = require("../../lib/cart")

const User = require("../models/User")
const Order = require("../models/Order")

const LoadProductService = require("../services/LoadProductService")

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
    let orders = await Order.findAll({ where: { buyer_id: request.session.userId }})

    const getOrdersPromise = orders.map( async order => {
      order.product = await LoadProductService.load("products", { where: { id: order.product_id }})

      order.buyer = await User.findOne({ where: { id: order.buyer_id }})
      order.seller = await User.findOne({ where: { id: order.seller_id }})
      order.formattedPrice = formatPrice(order.price)
      order.formattedTotal = formatPrice(order.total)

      const statuses = {
        open: "Open",
        sold: "Sold",
        canceled: "Canceled"
      }

      order.formattedStatus = statuses[order.status]

      const updatedAt = date(order.updated_at)
      order.formattedUpdatedAt = `${order.formattedStatus} on ${updatedAt.day}/${updatedAt.month}/${updatedAt.year} at ${updatedAt.hour}h${updatedAt.minutes}`

      return order
    })

    orders = await Promise.all(getOrdersPromise)

    return response.render("home/index", { orders })
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
  }
}