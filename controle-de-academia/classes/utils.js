module.exports = {
  age: function(timestamp) {

    // cria um novo objeto de data
    const today = new Date()
    const birthDate = new Date(timestamp)
  
    // idade através do ano de aniversário
    let age = today.getFullYear() - birthDate.getFullYear()
    const month = today.getMonth() - birthDate.getMonth()
  
    // o mês do aniversário ainda não é o atual, ou é e assim verifica-se o dia
    if (month < 0 || month == 0 && today.getDate() < birthDate.getDate())
      age = age - 1
  
    return age
  },
  date: function(timestamp) {

    // cria um novo objeto de data
    const date = new Date(timestamp)

    // yyy
    const year = date.getUTCFullYear()
  
    // mm
    const month = `0${date.getUTCMonth() + 1}`.slice(-2)

    // dd
    const day = `0${date.getUTCDate()}`.slice(-2)

    return `${year}-${month}-${day}`
  }
}