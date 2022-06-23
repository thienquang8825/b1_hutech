import express from 'express'
import { WritingController } from '../controllers/writing.controller.js'
import { AuthMiddleware } from '../middleware/auth.middleware.js'

const router = express.Router()

router
  .route('/')
  .post(
    AuthMiddleware.authorize,
    AuthMiddleware.admin,
    WritingController.createWriting
  )

router.route('/list').get(WritingController.getWritingList)

router
  .route('/:id')
  .get(
    AuthMiddleware.authorize,
    AuthMiddleware.admin,
    WritingController.getWritingById
  )
  .put(
    AuthMiddleware.authorize,
    AuthMiddleware.admin,
    WritingController.updateWriting
  )
  .delete(
    AuthMiddleware.authorize,
    AuthMiddleware.admin,
    WritingController.deleteWriting
  )

export default router
