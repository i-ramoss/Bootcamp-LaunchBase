const { formatPrice } = require("../lib/utils")

const Product = require("../../models/Product")

module.exports = {
  async index(request, response) {
    let results = await Product.all()
    const products = results.rows

    if(!products) return response.status(404).json({ err: "Product not found!" })

    async function getImage(productId) {
      let results = await Product.files(productId)

      const files = results.rows.map( file => `${request.protocol}://${request.headers.host}${file.path.replace("public", "")}`)

      return files[0]
    }

    const productsPromise = products.map( async product => {
      product.img = await getImage(product.id)
      product.oldPrice = formatPrice(product.old_price)
      product.price = formatPrice(product.price)

      return product
    }).filter( (product, index) => index > 2 ? false : true)

    const lastAdded = await Promise.all(productsPromise)

    return response.render("home/index", { products: lastAdded})
  }
}