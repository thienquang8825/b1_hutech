import express from 'express'
import dotenv from 'dotenv'
import data from './data.js'

dotenv.config()

const app = express()

app.get('/', (req, res) => {
  res.send('API is running...')
})

const PORT = process.env.PORT || 8825

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} on port ${PORT}`)
)
