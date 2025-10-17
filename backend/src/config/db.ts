import { Client, Pool } from 'pg'

// const con = new Client({
//   host: 'localhost',
//   user: 'postgres',
//   port: 5432,
//   password: 'root123',
//   database: 'order-app-db',
// })

const pool = new Pool({
  host: 'db',
  port: 5432,
  user: 'user123',
  password: 'password123',
  database: 'db123',
})

export default pool
