const users = [
  { name: 'Flora', revenues: [115.3, 48.7, 98.3, 14.5], expenses: [85.3, 13.5, 19.9] },
  { name: "Cecília", revenues: [24.6, 214.3, 45.3], expenses: [185.3, 12.1, 120.0] },
  { name: "Pandora", revenues: [9.8, 120.3, 340.2, 45.3], expenses: [450.2, 29.9] },
  { name: "Clara", revenues: [24.6, 214.3, 45.3], expenses: [24.6, 214.3, 45.3] }
]

function balance(revenue, expense) {

  const totalRevenues = sum(revenue)
  const totalExpenses = sum(expense)

  return totalRevenues - totalExpenses
}

function sum(numbers) {
  let total = 0

  for (number of numbers)
    total += number
  
  return total
}

for (user of users) {
  const total = balance(user.revenues, user.expenses) 

  if (total > 0) 
    console.log( `${user.name} possui saldo POSITIVO de ${total.toFixed(2)}`)
  else if (total == 0) {
    console.log( `${user.name} possui saldo NEUTRO de ${total.toFixed(2)}`)
  }
  else {
    console.log( `${user.name} possui saldo NEGATIVO de ${total.toFixed(2)}`)
  }
}