import 'tsconfig-paths/register'

import colors from 'colors'
import cors from 'cors'
import express, { type Request, type Response } from 'express'
import swaggerUi from 'swagger-ui-express'

import sequelize from '@config/db'
import { PORT } from '@config/env'
import { swaggerSpec } from '@config/swagger'

import categoryRoutes from '@modules/category/category.routes'
import productRoutes from '@modules/products/products.routes'
import userRoutes from '@modules/user/user.routes'

const app = express()

// Middleware
app.use(cors())
app.use(express.json())
app.use('/api-docs-json', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

// Routes
app.get('/api', (_: Request, res: Response) => {
  res.send(
    `Server has been started on port ${colors.bgBlue(
      `http://localhost:${PORT}`,
    )}`,
  )
})

app.use('/api/categories', categoryRoutes)
app.use('/api/products', productRoutes)
app.use('/api/auth', userRoutes)

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
