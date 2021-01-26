const express = require("express")
const multer = require("../app/middlewares/multer")

const ProductController = require("../app/controllers/ProductController")
const SearchController = require("../app/controllers/SearchController")

const { onlyUsers } = require("../app/middlewares/session")

const routes = express.Router()

// Search
routes.get("/search", SearchController.index)

// Products
routes.get("/create", onlyUsers, ProductController.create)
routes.get("/:id", ProductController.show)
routes.get("/:id/edit", onlyUsers, ProductController.edit)
routes.post("/", multer.array("photos", 6), onlyUsers, ProductController.post)
routes.put("/", multer.array("photos", 6), onlyUsers, ProductController.update)
routes.delete("/", onlyUsers, ProductController.delete)

module.exports = routes