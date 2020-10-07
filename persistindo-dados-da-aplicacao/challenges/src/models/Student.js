const db = require("../config/db")
const { date } = require("../app/lib/utils")

module.exports = {
  
  all(callback) {
    db.query(`
      SELECT *
      FROM students
      ORDER BY name ASC`, (err, results) => {
        if(err) throw `Show Error! ${err}`

        callback(results.rows)
      })
  }
}