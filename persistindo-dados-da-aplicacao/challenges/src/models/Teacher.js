const db = require("../config/db")
const { date  } = require('../app/lib/utils')


module.exports = {

  all(callback) {
    db.query(`
    SELECT teachers.*, count(students) AS total_students
    FROM teachers
    LEFT JOIN students ON (students.teacher_id = teachers.id)
    GROUP BY teachers.id
    ORDER BY total_students DESC`, (err, results) => {
      if (err) throw `Show Error! ${err}`

      callback(results.rows)
    })
  },

  create(data, callback) {
    const query = `
      INSERT INTO teachers (
        avatar_url,
        name,
        birth_date,
        education_level,
        class_type,
        subjects_taught,
        created_at
      ) VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING id
    `
    const values = [
      data.avatar_url,
      data.name,
      date(data.birth_date).iso,
      data.education_level,
      data.class_type,
      data.subjects_taught,
      date(Date.now()).iso
    ]

    db.query(query, values, (err, results) => {
      if(err) throw `Create Error! ${err}`

      callback(results.rows[0])
    })
  },

  find(id, callback) {
    db.query(`
      SELECT *
      FROM teachers
      WHERE id = $1`, [id], (err, results) => {
        if(err) throw `Find Error! ${err}`

        callback(results.rows[0])
      })
  },

  findBy(filter, callback) {
    db.query(`
    SELECT teachers.*, count(students) AS total_students
    FROM teachers
    LEFT JOIN students ON (students.teacher_id = teachers.id)
    WHERE teachers.name ILIKE '%${filter}%'
    OR teachers.subjects_taught ILIKE '%${filter}%'
    GROUP BY teachers.id
    ORDER BY total_students DESC`, (err, results) => {
      if (err) throw `Show Error! ${err}`

      callback(results.rows)
    })
  },

  update(data, callback) {
    const query = `
      UPDATE teachers SET
        avatar_url=($1),
        name=($2),
        birth_date=($3),
        education_level=($4),
        class_type=($5),
        subjects_taught=($6)
      WHERE id = ($7)
    `
    const values = [
      data.avatar_url,
      data.name,
      date(data.birth_date).iso,
      data.education_level,
      data.class_type,
      data.subjects_taught,
      data.id
    ]

    db.query(query, values, (err, results) => {
      if(err) throw `Update Error! ${err}`

      callback()
    })
  },

  delete(id, callback) {
    db.query(`DELETE FROM teachers WHERE id = $1`, [id], (err, results) => {
      if(err) throw `Delete Error! ${err}`

      return callback()
    })
  }  
}