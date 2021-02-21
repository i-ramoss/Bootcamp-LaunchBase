const express = require("express")

const CartController = require("../app/controllers/CartController")

const routes = express.Router()

routes.get("/", CartController.index)

module.exports = routes
