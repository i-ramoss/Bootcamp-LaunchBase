// conexão constante com o banco 
const { Pool } = require("pg")

modudle.exports = new Pool({
  user: "postgres",
  password: "postgres",
  host: "localhost",
  port: "5432",
  database: "gymmanager"
})