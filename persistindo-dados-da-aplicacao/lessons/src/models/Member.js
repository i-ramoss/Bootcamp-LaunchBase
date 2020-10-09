const db = require("../config/db")
const { date, blood_type } = require ('../app/lib/utils')

module.exports = {

  all(callback) {
    db.query(`
    SELECT * 
    FROM members
    ORDER BY name ASC`, (err, results) => {
      if (err) throw `Database Error! ${err}`

      callback(results.rows)
    })

  },

  create(data, callback) {
    const query = `
      INSERT INTO members (
        name,
        avatar_url,
        gender,
        email,
        birth,
        blood,
        weight,
        height,
        instructor_id
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      RETURNING id
    `
    const values = [
      data.name,
      data.avatar_url,
      data.gender,
      data.email,
      date(data.birth).iso,
      data.blood,
      data.weight,
      data.height,
      data.instructor
    ]

    db.query(query, values, (err, results) => {
      if(err) throw `Create Error! ${err}`

      callback(results.rows[0])
    })
  },

  find(id, callback) {
    db.query(`
    SELECT members.*, instructors.name AS instructor_name
    FROM members 
    LEFT JOIN instructors ON (members.instructor_id = instructors.id)
    WHERE members.id = $1`, [id], (err, results) => {
      if(err) throw `Find Error! ${err}`

      callback(results.rows[0])
    })
  },

  update(data, callback) {
    const query = `
      UPDATE members SET
        avatar_url=($1),
        name=($2),
        birth=($3),
        gender=($4),
        email=($5),
        blood=($6),
        weight=($7),
        height=($8),
        instructor_id=($9)
      WHERE id = $10
    `
    const values = [
      data.avatar_url,
      data.name,
      date(data.birth).iso,
      data.gender,
      data.email,
      data.blood,
      data.weight,
      data.height,
      data.instructor,
      data.id
    ]

    db.query(query, values, (err, results) => {
      if(err) throw `Update Error! ${err}`
      
      callback()
    })
  },

  delete(id, callback) {
    db.query(`DELETE FROM members WHERE id = $1`, [id], (err, results) => {
      if (err) throw `Delete Error! ${err}`

      return callback()
    })
  },

  instructorsSelectOptions(callback) {
    db.query(`
      SELECT name, id FROM instructors`, (err, results) => {
        if(err) throw `Select Instructor Error! ${err}` 

        callback(results.rows)
      })
  }
}