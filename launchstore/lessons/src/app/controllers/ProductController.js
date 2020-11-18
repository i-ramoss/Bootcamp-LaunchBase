const Category = require("../../models/Category");
const Product = require("../../models/Product");

module.exports = {
  create(request, response) {
    Category.all()
    .then( results => {
      const categories = results.rows

      return response.render("products/create.njk", { categories })
    }).catch( err => {
      throw new Error(err)
    })
  },

  async post(request, response) {
    const keys = Object.keys(request.body)

    for (key of keys) {
      if (request.body[key] == "")
        return response.json({ err: "Please, fill all fields!" })
    }

    let results = await Product.create(request.body)  
    const productId = results.rows[0].id

    results = await Category.all()
    const categories = results.rows

    return response.render("products/create.njk", { productId, categories })
  },
}