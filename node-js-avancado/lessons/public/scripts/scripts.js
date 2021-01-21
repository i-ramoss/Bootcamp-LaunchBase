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
  },

  cpfCnpj(value) {
    value = value.replace(/\D/g, "")

    if (value.length > 14) value = value.slice(0, -1)

    if (value.length > 11) value = value.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/g, "$1.$2.$3/$4-$5")

    else value = value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, "$1.$2.$3-$4")

    return value
  },

  zipCode(value) {
    value = value.replace(/\D/g, "")

    if (value.length > 8) value = value.slice(0, -1)

    value = value.replace(/(\d{5})(\d{3})/g, "$1-$2")

    return value
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
    const { image } = LightBox
    
    previews.forEach( preview => preview.classList.remove("active"))

    target.classList.add("active")

    highlight.src = target.src
    image.src = target.src
  }
}

const LightBox = {
  target: document.querySelector(".lightbox-target"),

  image: document.querySelector(".lightbox-target img"),

  closeButton: document.querySelector(".lightbox-target a.lightbox-close"),

  open() {
    const { target, closeButton } = LightBox

    target.style.opacity = 1
    target.style.top = 0
    target.style.bottom = 0

    closeButton.style.top = 0
  },

  close() {
    const { target, closeButton } = LightBox

    target.style.opacity = 0
    target.style.top = "-100%"
    target.style.bottom = "initial"

    closeButton.style.top = "-80px"
  }
}

const Validate = {
  apply(input, func) {
    Validate.clearErrors(input) 

    let results = Validate[func](input.value)
    input.value = results.value

    if (results.error) Validate.displayError(input, results.error)
  },

  displayError(input, error) {
    const div = document.createElement("div")

    div.classList.add("error")
    div.innerHTML = error

    input.parentNode.appendChild(div)
  },

  clearErrors(input) {
    const errorDiv = input.parentNode.querySelector(".error")

    if (errorDiv) errorDiv.remove()
  },

  isEmail(value) {
    let error = null

    const mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

    if (!value.match(mailFormat)) error = "Invalid Email"

    return {
      error,
      value
    }
  },

  isCpfCnpj(value) {
    let error = null

    const cleanValues = value.replace(/\D/g, "")

    if (cleanValues.length > 11 && cleanValues.length !== 14) error = "Invalid CNPJ"

    else if (cleanValues.length < 12 && cleanValues.length !== 11) error = "Invalid CPF"

    return {
      error,
      value
    }
  },

  isZipCode(value) {
    let error = null

    const cleanValues = value.replace(/\D/g, "")

    if (cleanValues.length !== 8) error = "Invalid ZIP Code"
    
    return {
      error,
      value
    }
  }
}