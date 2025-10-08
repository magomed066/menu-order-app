const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const colors = require('colors')

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(cors())
app.use(express.json())

// Routes
app.get('/api', (req, res) => {
  res.json({ message: 'Hello from Docker backend!' })
})

app.post('/api/data', (req, res) => {
  const { message } = req.body
  res.json({ received: message, timestamp: new Date().toISOString() })
})

app.listen(PORT, () => {
  console.log(
    `Server has been started on port ${colors.bgBlue(
      `http://localhost:${PORT}`
    )}`
  )
})
