async function create(request, response, next) {
  const keys = Object.keys(request.body)

  for (key of keys) {
    if (request.body[key] == "")
      return response.json({ err: "Please, fill all fields!" })
  }

  if(!reques.files || request.files.length === 0) return response.json("Please, send at least one image")

  next()
}

async function update(request, response, next) {
  const keys = Object.keys(request.body)

  for (key of keys) {
    if (request.body[key] == "" && key != "removed_files")
      return response.json({ err: "Please, fill all fields!" })
  }

  next()
}

module.exports = {
  create,
  update
}