const express = require("express")
const ProductController = require("./app/controllers/ProductController")

const routes = express.Router()

routes.get("/", (request, response ) => {
  return response.render("layout.njk")
})
routes.get("/products/create", ProductController.create)
routes.post("/products", ProductController.post)

// Alias
routes.get("/ads/create", (request, response ) => {
  return response.redirect("/products/create")
})


module.exports = routes