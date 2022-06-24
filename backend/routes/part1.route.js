import express from 'express'
import { Part1Controller } from '../controllers/part1.controller.js'
import { AuthMiddleware } from '../middleware/auth.middleware.js'

const router = express.Router()

router
  .route('/')
  .post(
    AuthMiddleware.authorize,
    AuthMiddleware.admin,
    Part1Controller.createPart1
  )

router.route('/list').get(Part1Controller.getPart1List)

export default router
