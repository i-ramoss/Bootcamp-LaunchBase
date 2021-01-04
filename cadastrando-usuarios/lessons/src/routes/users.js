const express = require("express")

const routes = express.Router()

const SessionController = require("../app/controllers/SessionController")
const UserController = require("../app/controllers/UserController")

const UserValidator = require("../app/validators/user")
const SessionValidator = require("../app/validators/session")

const { isLoggedRedirectToUsers, onlyUsers } = require("../app/middlewares/session")

// // Login / Logout
routes.get("/login", isLoggedRedirectToUsers, SessionController.loginForm)
routes.post("/login", SessionValidator.login, SessionController.login)
routes.post("/logout", SessionController.logout)

// // Reset password / Forgot
// routes.get("/forgot-password", SessionController.forgotForm)
// routes.get("/password-reset", SessionController.resetForm)
// routes.post("/forgot-password", SessionController.forgot)
// routes.post("/password-reset", SessionController.reset)

// // User register
routes.get("/register", UserController.registerForm)
routes.post("/register", UserValidator.create, UserController.create)
routes.get("/", onlyUsers, UserValidator.show, UserController.show)
routes.put("/", UserValidator.update, UserController.update)
// routes.delete("/", UserController.delete)

module.exports = routes
