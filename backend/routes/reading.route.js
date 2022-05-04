import express from 'express'
import { ReadingController } from '../controllers/reading.controller.js'
import { AuthMiddleware } from '../middleware/auth.middleware.js'

const router = express.Router()

router
  .route('/')
  .post(
    AuthMiddleware.authorize,
    AuthMiddleware.admin,
    ReadingController.createReading
  )

router.route('/one').get(ReadingController.getReadingOne)

router
  .route('/list')
  .get(
    AuthMiddleware.authorize,
    AuthMiddleware.admin,
    ReadingController.getReadingList
  )

router
  .route('/:id')
  .get(
    AuthMiddleware.authorize,
    AuthMiddleware.admin,
    ReadingController.getReadingById
  )
  .put(
    AuthMiddleware.authorize,
    AuthMiddleware.admin,
    ReadingController.updateReading
  )
  .delete(
    AuthMiddleware.authorize,
    AuthMiddleware.admin,
    ReadingController.deleteReading
  )

export default router
