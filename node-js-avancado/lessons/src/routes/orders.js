const express = require("express")

const OrderController = require("../app/controllers/OrderController")

const { onlyUsers } = require("../app/middlewares/session")

const routes = express.Router()

.get("/", onlyUsers, OrderController.index)
.get("/sales", onlyUsers, OrderController.sales)
.get("/:id", onlyUsers, OrderController.show)

.post("/:id/:action", onlyUsers, OrderController.update)
.post("/", onlyUsers, OrderController.create)

module.exports = routes
