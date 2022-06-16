import express from 'express'
import { TransformController } from '../controllers/transform.controller.js'
import { AuthMiddleware } from '../middleware/auth.middleware.js'

const router = express.Router()

router
  .route('/')
  .post(
    AuthMiddleware.authorize,
    AuthMiddleware.admin,
    TransformController.createTransform
  )

router.route('/list').get(TransformController.getTransformList)

router
  .route('/:id')
  .get(
    AuthMiddleware.authorize,
    AuthMiddleware.admin,
    TransformController.getTransformById
  )
  .put(
    AuthMiddleware.authorize,
    AuthMiddleware.admin,
    TransformController.updateTransform
  )
  .delete(
    AuthMiddleware.authorize,
    AuthMiddleware.admin,
    TransformController.deleteTransform
  )

export default router
