import express from 'express'
import { SignsController } from '../controllers/signs.controller..js'
import { AuthMiddleware } from '../middleware/auth.middleware.js'

const router = express.Router()

router
  .route('/')
  .post(
    AuthMiddleware.authorize,
    AuthMiddleware.admin,
    SignsController.createSigns
  )

router.route('/list').get(SignsController.getSignsList)

router
  .route('/:id')
  .get(
    AuthMiddleware.authorize,
    AuthMiddleware.admin,
    SignsController.getSignsById
  )
  .put(
    AuthMiddleware.authorize,
    AuthMiddleware.admin,
    SignsController.updateSigns
  )
  .delete(
    AuthMiddleware.authorize,
    AuthMiddleware.admin,
    SignsController.deleteSigns
  )

export default router
