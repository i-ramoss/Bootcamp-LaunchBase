module.exports = {
  age(timestamp) {
    const today = new Date()
    const birthDate = new Date(timestamp)

    let age = today.getFullYear() - birthDate.getFullYear()
    const month = today.getMonth() - birthDate.getMonth()

    if (month < 0 || month == 0 && today.getDate() < birthDate.getDate())
      age = age - 1

    return age
  },
  date(timestamp) {
    const date = new Date(timestamp)

    const year = date.getUTCFullYear()
    const month = `0${date.getUTCMonth() + 1}`.slice(-2)
    const day = `0${date.getUTCDate()}`.slice(-2)

    return {
      day,
      month,
      year,
      iso: `${year}-${month}-${day}`,
      birthDay: `${day}/${month}`
    }
  },
  graduation(value) {
    switch(value) {
      case('high_school'): return 'Complete High School'
      case('higher_education'): return 'Complete Higher Education'
      case('masters'): return 'Master'
      case('doctorate'): return 'Doctorate'
    }
  },
  grade(value) { 
    switch(value) {
      case('5th'): return '5th Year of Elementary School'
      case('6th'): return '6th Year of Elementary School'
      case('7th'): return '7th Year of Elementary School'
      case('8th'): return '8th Year of Elementary School'
      case('1st'): return '1st Year of Elementary School'
      case('2nd'): return '2nd Year of Elementary School'
      case('3rd'): return '3rd Year of Elementary School'
    }
  }
}