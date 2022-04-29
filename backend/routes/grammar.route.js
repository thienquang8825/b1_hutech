import express from 'express'
import { GrammarController } from '../controllers/grammar.controller.js'
import { AuthMiddleware } from '../middleware/auth.middleware.js'

const router = express.Router()

router.route('/').get(GrammarController.getGrammar)

router
  .route('/:id')
  .get(
    AuthMiddleware.authorize,
    AuthMiddleware.admin,
    GrammarController.getGrammarById
  )
  .put(
    AuthMiddleware.authorize,
    AuthMiddleware.admin,
    GrammarController.updateGrammar
  )

export default router
