import express from 'express'
import { ListeningController } from '../controllers/listening.controller.js'
import { AuthMiddleware } from '../middleware/auth.middleware.js'

const router = express.Router()

router
  .route('/')
  .post(
    AuthMiddleware.authorize,
    AuthMiddleware.admin,
    ListeningController.createListening
  )

router.route('/one').get(ListeningController.getListeningOne)

router
  .route('/list')
  .get(
    AuthMiddleware.authorize,
    AuthMiddleware.admin,
    ListeningController.getListeningList
  )

router
  .route('/:id')
  .get(
    AuthMiddleware.authorize,
    AuthMiddleware.admin,
    ListeningController.getListeningById
  )
  .put(
    AuthMiddleware.authorize,
    AuthMiddleware.admin,
    ListeningController.updateListening
  )
  .delete(
    AuthMiddleware.authorize,
    AuthMiddleware.admin,
    ListeningController.deleteListening
  )

export default router
