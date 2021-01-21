const Base = {
  init({ table }) {
    if (!table) throw new Error("Invalid Params")

    this.table = table

    return this
  },

  async findOne(filters) {
    try {
      let query = `SELECT * FROM ${this.table}`

      Object.keys(filters).map( key => {
        query = `
          ${query}
          ${key}
        `
  
        Object.keys(filters[key]).map( field => {
          query = `${query} ${field} = '${filters[key][field]}'`
        })
      })
  
      const results = await db.query(query)
      
      return results.rows[0]
    }
    catch (err) {
      console.error(err)
    }
  },
}

module.exports = Base