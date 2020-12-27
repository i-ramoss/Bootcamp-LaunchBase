const express = require("express")
const multer = require("./app/middlewares/multer")

const ProductController = require("./app/controllers/ProductController")
const HomeController = require("./app/controllers/HomeController")
const SearchController = require("./app/controllers/SearchController")

const routes = express.Router()

// Home
routes.get("/", HomeController.index)

// Search
routes.get("/products/search", SearchController.index)

// Products
routes.get("/products/create", ProductController.create)
routes.get("/products/:id", ProductController.show)
routes.get("/products/:id/edit", ProductController.edit)
routes.post("/products", multer.array("photos", 6), ProductController.post)
routes.put("/products", multer.array("photos", 6), ProductController.update)
routes.delete("/products", ProductController.delete)

// Alias
routes.get("/ads/create", (request, response ) => {
  return response.redirect("/products/create")
})




module.exports = routes