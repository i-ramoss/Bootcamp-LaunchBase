function onlyUsers(request, response, next) {
  if (!request.session.userId) return response.redirect("/users/login")

  next()
}

function isLoggedRedirectToUsers(request, response, next) {
  if (request.session.userId) return response.redirect("/users")

  next()
}

module.exports = {
  onlyUsers,
  isLoggedRedirectToUsers
}