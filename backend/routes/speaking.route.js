import express from 'express'
import { SpeakingController } from '../controllers/speaking.controller.js'
import { AuthMiddleware } from '../middleware/auth.middleware.js'

const router = express.Router()

router
  .route('/')
  .post(
    AuthMiddleware.authorize,
    AuthMiddleware.admin,
    SpeakingController.createSpeaking
  )

router.route('/list').get(SpeakingController.getSpeakingList)

router
  .route('/:id')
  .get(
    AuthMiddleware.authorize,
    AuthMiddleware.admin,
    SpeakingController.getSpeakingById
  )
  .put(
    AuthMiddleware.authorize,
    AuthMiddleware.admin,
    SpeakingController.updateSpeaking
  )
  .delete(
    AuthMiddleware.authorize,
    AuthMiddleware.admin,
    SpeakingController.deleteSpeaking
  )

export default router
