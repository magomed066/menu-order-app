import 'tsconfig-paths/register'
import express, { type Request, type Response } from 'express'
import cors from 'cors'
import colors from 'colors'
import { PORT } from './config/env'
import sequelize from './config/db'
import categoryRoutes from './modules/category/category.routes'

const app = express()

// Middleware
app.use(cors())
app.use(express.json())

// Routes
app.get('/api', (_: Request, res: Response) => {
  res.send(
    `Server has been started on port ${colors.bgBlue(
      `http://localhost:${PORT}`,
    )}`,
  )
})

app.use('/api/categories', categoryRoutes)

sequelize
  .sync()
  .then(() => {
    console.log(colors.bgGreen('Connected to the DB...'))
    app.listen(PORT, () => {
      console.log(
        `Server has been started on port ${colors.bgBlue(
          `http://localhost:${PORT}`,
        )}`,
      )
    })
  })
  .catch((err) => {
    console.log(err)
  })
