const express = require("express")
const routes = express.Router()
const multer = require("../app/middlewares/multer")

const ProductController = require("../app/controllers/ProductController")
const SearchController = require("../app/controllers/SearchController")

// Search
routes.get("/products/search", SearchController.index)

// Products
routes.get("/create", ProductController.create)
routes.get("/:id", ProductController.show)
routes.get("/:id/edit", ProductController.edit)
routes.post("/", multer.array("photos", 6), ProductController.post)
routes.put("/", multer.array("photos", 6), ProductController.update)
routes.delete("/", ProductController.delete)

module.exports = routes