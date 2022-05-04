import express from 'express'
import { ReadingController } from '../controllers/reading.controller.js'
import { AuthMiddleware } from '../middleware/auth.middleware.js'

const router = express.Router()

router.route('/').get(ReadingController.getReading)

router.route('/:id').get(ReadingController.getReadingById)

export default router
