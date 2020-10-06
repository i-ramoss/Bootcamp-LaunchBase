module.exports = {
  age(timestamp) {

    // cria um novo objeto de data
    const today = new Date()
    const birthDate = new Date(timestamp)
  
    // idade através do ano de aniversário
    let age = today.getFullYear() - birthDate.getFullYear()
    const month = today.getMonth() - birthDate.getMonth()
  
    // o mês do aniversário ainda não é o atual, ou é e assim verifica-se o dia
    if (month < 0 || month == 0 && today.getDate() <= birthDate.getDate())
      age = age - 1
  
    return age
  },

  date(timestamp) {

    // cria um novo objeto de data
    const date = new Date(timestamp)

    // yyy
    const year = date.getUTCFullYear()
  
    // mm
    const month = `0${date.getUTCMonth() + 1}`.slice(-2)

    // dd
    const day = `0${date.getUTCDate()}`.slice(-2)

    return {
      day,
      month,
      year,
      iso: `${year}-${month}-${day}`,
      birthDay: `${day}/${month}`,
      format: `${day}/${month}/${year}`
    }
  },
  
  blood_type(value) {
    switch(value) {
      case('A1'): return 'A+'
      case('A0'): return 'A-'
      case('B1'): return 'B+'
      case('B0'): return 'B-'
      case('AB1'): return 'AB+'
      case('AB0'): return 'AB-'
      case('O1'): return 'O+'
      case('O0'): return 'O-'
    }
  }
}