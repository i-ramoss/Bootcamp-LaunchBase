module.exports = {
  loginForm(request, response) {
    return response.render("session/login")
  },
  
  login(request, response) {
    request.session.userId = request.user.id

    return response.redirect("/users")
  },

  logout(request, response) {
    request.session.destroy();

    return response.redirect("/")
  }
}