const mailer = require("../lib/mailer")

const User = require("../models/User")

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
  async create(request, response) {
    try {
      const product = await LoadProductService.load("product", { where: { id: request.body.id }})

      const seller = await User.findOne({ where: { id: product.user_id }})

      const buyer = await User.findOne({ where: { id: request.session.userId }})

      await mailer.sendMail({
        to: seller.email,
        from: "no-reply@launchstore.com.br",
        subject: "New purchase order",
        html: email(seller, product, buyer)
      })

      return response.render("orders/success")
    } 
    catch (err) {
      console.error(err)
      return repsonse.render("orders/error")
    }
  }
}