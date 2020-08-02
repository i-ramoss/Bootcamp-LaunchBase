module.exports = {
  age: (timestamp) => {
    const today = new Date()
    const birthDate = new Date(timestamp)

    let age = today.getFullYear() - birthDate.getFullYear()
    const month = today.getMonth() - birthDate.getMonth()

    if (month < 0 || month == 0 && today.getDate() < birthDate.getDate())
      age = age - 1

    return age
  },
  date: (timestamp) => {
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
  graduation: (value) => {
    switch(value) {
      case('high_school'): return 'Complete High School'
      case('higher_education'): return 'Complete Higher Education'
      case('masters'): return 'Master'
      case('doctorate'): return 'Doctorate'
    }
  },
  grade: (value) => { 
    switch(value) {
      case('5th'): return '5th year of elementary school'
      case('6th'): return '6th year of elementary school'
      case('7th'): return '7th year of elementary school'
      case('8th'): return '8th year of elementary school'
      case('1st'): return '1st year of elementary school'
      case('2nd'): return '2nd year of elementary school'
      case('3rd'): return '3rd year of elementary school'
    }
  }
}