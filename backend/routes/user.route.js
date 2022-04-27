import express from 'express'
import { UserController } from '../controllers/user.controller.js'

const router = express()

router.route('/').post(UserController.registerUser)

router.route('/login').post(UserController.loginUser)

export default router
