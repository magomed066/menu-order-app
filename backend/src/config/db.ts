import { Sequelize } from 'sequelize'
import { DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT, DB_USER_NAME } from './env'

const sequelize = new Sequelize(DB_NAME, DB_USER_NAME, DB_PASSWORD, {
  dialect: 'mysql',
  ...(DB_PORT !== undefined ? { port: DB_PORT } : {}),
  host: DB_HOST,
  logging: false,
})

export default sequelize
