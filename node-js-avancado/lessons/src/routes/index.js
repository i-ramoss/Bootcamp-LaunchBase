const express = require("express")

const HomeController = require("../app/controllers/HomeController")

const products = require("./products")
const users = require("./users")
const cart = require("./cart")
const orders = require("./orders")

const routes = express.Router()

routes.get("/", HomeController.index)

routes.use("/products", products)
routes.use("/users", users)
routes.use("/cart", cart)
routes.use("/orders", orders)

// Alias
routes.get("/ads/create", (request, response ) => {
  return response.redirect("/products/create")
})

routes.get("/accounts", (request, response ) => {
  return response.redirect("/users/login")
})

module.exports = routes