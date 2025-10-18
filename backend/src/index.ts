import express, { type Request, type Response } from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import colors from 'colors'
// import pool from ''

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000

// Middleware
app.use(cors())
app.use(express.json())

// Routes
app.get('/api', (req: Request, res: Response) => {
  res.send('Hello, TypeScript + Express!')
})

app.post('/api/data', (req: Request, res: Response) => {
  const { message } = req.body
  res.json({ received: message, timestamp: new Date().toISOString() })
})

// pool.connect().then(() => {
app.listen(PORT, () => {
  console.log(
    `Server has been started on port ${colors.bgBlue(
      `http://localhost:${PORT}`,
    )}`,
  )
})
// })
