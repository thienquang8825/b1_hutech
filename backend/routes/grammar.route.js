import express from 'express'
import { GrammarController } from '../controllers/grammar.controller.js'

const router = express.Router()

router.route('/').get(GrammarController.getGrammar)

export default router
