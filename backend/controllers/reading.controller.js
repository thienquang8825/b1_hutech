import Reading from '../models/reading.model.js'
import asyncHandler from 'express-async-handler'

// @desc    Get reading
// @route   GET /api/reading
// @access  Private/Admin
const getReadingList = asyncHandler(async (req, res) => {
  const pageSize = 10
  const page = Number(req.query.pageNumber) || 1

  const keyword = req.query.keyword
    ? {
        question: {
          $regex: req.query.keyword,
          $options: 'i', //don't care about case sensitive
        },
      }
    : {}

  const count = await Reading.count({ ...keyword }) //({ ...keyword }) ~ ({ question: ... })

  const questions = await Reading.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1))

  res.json({
    questions,
    page,
    pages: Math.ceil(count / pageSize),
  })
})

// @desc    Get a reading
// @route   GET /api/reading
// @access  Public
const getReading = asyncHandler(async (req, res) => {
  const page = Number(req.query.pageNumber) || 1

  const count = await Reading.count({})

  const question = await Reading.find({})
    .limit(1)
    .skip(page - 1)

  res.json({
    question,
    page,
    pages: count,
  })
})

// @desc    Get reading by id
// @route   GET /api/reading/:id
// @access  Public
const getReadingById = asyncHandler(async (req, res) => {
  const question = await Reading.findById(req.params.id)

  if (question) {
    res.json({ question, quatity })
  } else {
    res.status(404)
    throw new Error('Text not found')
  }
})

export const ReadingController = {
  getReading,
  getReadingById,
  getReadingList,
}
