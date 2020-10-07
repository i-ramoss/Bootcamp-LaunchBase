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
  },

  create(data, callback) {
    const query = `
      INSERT INTO students (
        avatar_url,
        name,
        email,
        birth_date,
        school_year,
        weekly
      ) VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING id
    `
    const values = [
      data.avatar_url,
      data.name,
      data.email,
      date(data.birth_date).iso,
      data.school_year,
      data.weekly
    ]

    db.query(query, values, (err, results) => {
      if(err) throw `Create Error! ${err}`

      callback(results.rows[0])
    })
  },

  find(id, callback) {
    db.query(`
      SELECT *
      FROM students
      WHERE id = $1`, [id], (err, results) => {
        if(err) throw `Find Error! ${err}`

        callback(results.rows[0])
      })
  },

  update(data, callback) {
    const query = `
      UPDATE students SET
        avatar_url=($1),
        name=($2),
        email=($3),
        birth_date=($4),
        school_year=($5),
        weekly=($6)
      WHERE id = ($7)
    `
    const values = [
      data.avatar_url,
      data.name,
      data.email,
      date(data.birth_date).iso,
      data.school_year,
      data.weekly,
      data.id
    ]

    db.query(query, values, (err, results) => {
      if(err) throw `Update Error! ${err}`

      callback()
    })
  },

  delete(id, callback) {
    db.query(`DELETE FROM students WHERE id = $1`, [id], (err, results) => {
      if(err) throw `Delete Error! ${err}`

      return callback()
    })
  }
}