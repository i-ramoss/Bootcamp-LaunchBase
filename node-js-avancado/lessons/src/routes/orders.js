const express = require("express")

const OrderController = require("../app/controllers/OrderController")

const { onlyUsers } = require("../app/middlewares/session")

const routes = express.Router()

.post("/", onlyUsers, OrderController.create)

module.exports = routes
