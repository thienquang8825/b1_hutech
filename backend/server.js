import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import morgan from 'morgan'
import connectDB from './config/mongoose.js'
import { ErrorMiddleware } from './middleware/error.middleware.js'

import userRoutes from './routes/user.route.js'
import grammarRoutes from './routes/grammar.route.js'
import readingRoutes from './routes/reading.route.js'

dotenv.config()

connectDB()

const app = express()

//allow to accept JSON data in the body of request
app.use(express.json())

//use morgan (show api in console)
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

app.get('/', (req, res) => {
  res.send('API is running...')
})

app.use('/api/users', userRoutes)
app.use('/api/grammar', grammarRoutes)
app.use('/api/reading', readingRoutes)

app.use(ErrorMiddleware.notFoundUrl)

app.use(ErrorMiddleware.errorHandle)

const PORT = process.env.PORT || 8825

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} on port ${PORT}`.yellow
  )
)
