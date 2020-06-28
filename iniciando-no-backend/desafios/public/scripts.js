const modalOverlay = document.querySelector('.modal-overlay')
const cards = document.querySelectorAll('.card')
const modal = document.querySelector('.modal')

for (let card of cards) {
  card.addEventListener('click', () => {
    const courseId = card.getAttribute('id')

    // modalOverlay.classList.add('active')
    // modalOverlay.querySelector('iframe').src = `https://rocketseat.com.br/${bootId}`

    window.location.href = `/courses/${courseId}`
  })
}

// document.querySelector('.close-modal').addEventListener('click', () => {
//   modalOverlay.classList.remove('active')
//   modalOverlay.querySelector('iframe').src = ""

//   if(modal.classList.contains('maximize'))
//     modal.classList.remove('maximize')
// })

// document.querySelector('.maximize-modal').addEventListener('click', () => {
//   modal.classList.toggle('maximize')
// })
