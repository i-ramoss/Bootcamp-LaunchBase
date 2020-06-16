const name = 'Flora'
const weight = 66
const height = 1.70

const imc = weight / (height * height)

if (imc >= 30)
  console.log(`${name}, you are overweight`)
else 
console.log(`${name}, you aren't overweight`)
  