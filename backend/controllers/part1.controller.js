import Part1 from '../models/part1.model.js'
import asyncHandler from 'express-async-handler'

// @desc    Get PART 1
// @route   GET /api/part1/list
// @access  Public
const getPart1List = asyncHandler(async (req, res) => {
  const exams = await Part1.find({})

  res.json(exams)
})

// @desc    Create PART 1
// @route   POST /api/part1
// @access  Private/Admin
const createPart1 = asyncHandler(async (req, res) => {
  const { title, questions } = req.body

  const newExam = new Part1({
    title,
    questions,
  })

  const createdExam = await newExam.save()
  res.status(201).json(createdExam)
})

export const Part1Controller = {
  createPart1,
  getPart1List,
}
