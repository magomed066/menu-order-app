import 'tsconfig-paths/register'

import colors from 'colors'
import cors from 'cors'
import express, { type Request, type Response } from 'express'
import swaggerUi from 'swagger-ui-express'

import sequelize from '@config/db'
import { PORT } from '@config/env'
import { swaggerSpec } from '@config/swagger'

import categoryRoutes from '@modules/category/category.routes'
import ordersRoutes from '@modules/orders/orders.routes'
import productRoutes from '@modules/products/products.routes'
import Table from '@modules/tables/tables.model'
import userRoutes from '@modules/user/user.routes'

const app = express()

// Middleware
app.use(cors())
// Increase body size limits to handle base64 images
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true, limit: '10mb' }))
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
app.use('/api/orders', ordersRoutes)

async function seedDefaultTables() {
  try {
    // Ensure a couple of default tables exist
    const defaults = [
      { tableNumber: '1', qrCodeHash: 'table-1', isActive: true, capacity: 2 },
      { tableNumber: '2', qrCodeHash: 'table-2', isActive: true, capacity: 4 },
    ]
    for (const t of defaults) {
      // findOrCreate by unique qrCodeHash
      await Table.findOrCreate({
        where: { qrCodeHash: t.qrCodeHash },
        defaults: t,
      })
    }
    console.log(colors.bgGreen('Default tables ensured'))
  } catch (e) {
    console.warn('Failed to seed default tables:', e)
  }
}

sequelize
  .sync()
  .then(async () => {
    console.log(colors.bgGreen('Connected to the DB...'))
    await seedDefaultTables()
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
