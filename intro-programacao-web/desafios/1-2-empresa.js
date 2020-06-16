const company = {
  name: 'Ecoleta',
  color: 'green',
  focus: 'recycle',
  adress: {
    street: 'Rua Guilherme Gembala',
    number: 260
  }
}

console.log( `The company ${company.name} which works with ${company.focus} is located at ${company.adress.number}, ${company.adress.street}. The building is ${company.color}.`)