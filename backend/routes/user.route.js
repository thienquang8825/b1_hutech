import express from 'express'
import asyncHandler from 'express-async-handler'
import User from '../models/user.model.js'

const router = express()

router.get(
  '/',
  asyncHandler(async (req, res) => {
    const users = await User.find({})

    res.json(users)
  })
)

export default router
