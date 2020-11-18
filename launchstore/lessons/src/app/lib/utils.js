module.exports = {
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
  }
}