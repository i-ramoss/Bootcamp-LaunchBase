const Mask = {
  apply(input, func) {
    setTimeout( () => {
      input.value = Mask[func](input.value)
    }, 0.1)
  },

  formatBRL(value) {
    value = value.replace(/\D/g, "")

    return value = new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL"
    }).format(value/100)
  }
}

const PhotosUpload = {
  preview: document.querySelector("#photos-preview"),

  uploadLimit: 6,
  
  input: "",

  files: [],

  handleFileInput(event) {
    const { files: fileList } = event.target
    const { preview, hasLimit, getContainer, getAllFiles } = PhotosUpload

    PhotosUpload.input = event.target

    if (hasLimit(event)) return

    Array.from(fileList).forEach( file => {
      const { files } = PhotosUpload

      files.push(file)

      const reader = new FileReader()

      reader.onload = () => {
        const image = new Image()

        image.src = String(reader.result)

        const div = getContainer(image)

        preview.appendChild(div)
      }

      reader.readAsDataURL(file)
    })
    
    PhotosUpload.input.files = getAllFiles()
  },

  hasLimit(event) {
    const { uploadLimit, input, preview } = PhotosUpload
    const { files: fileList } = input

    if (fileList.length > uploadLimit) {
      alert(`Upload a maximum of ${uploadLimit} photos`)
      event.preventDefault()
      return true
    }

    let photosDiv = []

    preview.childNodes.forEach( item => {
      if (item.classList && item.classList.value === "photo") photosDiv.push(item)
    })

    const totalPhotos =  fileList.length + photosDiv.length

    if (totalPhotos > uploadLimit) {
      alert("You have reached the maximum photo limit")
      event.preventDefault()
      return true
    }

    return false
  },

  getAllFiles() {
    const { files } = PhotosUpload
    const dataTransfer = new ClipboardEvent("").clipboardData || new DataTransfer()

    files.forEach( file => dataTransfer.items.add(file))

    return dataTransfer.files
  },
  
  getContainer(image) {
    const { getRemoveButton, removePhoto } = PhotosUpload
    const div = document.createElement("div")

    div.classList.add("photo")
    div.onclick = removePhoto
    div.appendChild(image)

    div.appendChild(getRemoveButton())

    return div
  },

  getRemoveButton() {
    const button = document.createElement("i")

    button.classList.add("material-icons")
    button.innerHTML = "close"

    return button
  },

  removePhoto(event) {
    let { preview, files, getAllFiles, input } = PhotosUpload
    
    const photoDiv = event.target.parentNode // <div class="photo">
    const photosArray = Array.from(preview.children)
    const index = photosArray.indexOf(photoDiv)

    files.splice(index, 1)
    input.files = getAllFiles()

    photoDiv.remove()
  },

  removeOldPhoto(event) {
    const photoDiv = event.target.parentNode

    if(photoDiv.id) {
      const removedFiles = document.querySelector("input[name='removed_files']")

      if (removedFiles) removedFiles.value += `${photoDiv.id},`
    }

    photoDiv.remove()
  }
}

const ImageGallery = {
  highlight: document.querySelector(".gallery .highlight > img"),

  previews: document.querySelectorAll(".gallery-preview img"),

  setImage(e) {
    const { target } = e
    const { previews, highlight } = ImageGallery
    
    previews.forEach( preview => preview.classList.remove("active"))

    target.classList.add("active")

    highlight.src = target.src
  }
}