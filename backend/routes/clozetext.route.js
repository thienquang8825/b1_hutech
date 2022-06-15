import express from 'express'
import { ClozetextController } from '../controllers/clozetext.controller.js'
import { AuthMiddleware } from '../middleware/auth.middleware.js'

const router = express.Router()

router
  .route('/')
  .post(
    AuthMiddleware.authorize,
    AuthMiddleware.admin,
    ClozetextController.createClozetext
  )

router.route('/one').get(ClozetextController.getClozetextOne)

router
  .route('/list')
  .get(
    AuthMiddleware.authorize,
    AuthMiddleware.admin,
    ClozetextController.getClozetextList
  )

router
  .route('/:id')
  .get(
    AuthMiddleware.authorize,
    AuthMiddleware.admin,
    ClozetextController.getClozetextById
  )
  .put(
    AuthMiddleware.authorize,
    AuthMiddleware.admin,
    ClozetextController.updateClozetext
  )
  .delete(
    AuthMiddleware.authorize,
    AuthMiddleware.admin,
    ClozetextController.deleteClozetext
  )

export default router
