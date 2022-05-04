import Reading from '../models/reading.model.js'
import asyncHandler from 'express-async-handler'

// @desc    Get a reading
// @route   GET /api/reading
// @access  Public
const getReadingOne = asyncHandler(async (req, res) => {
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

// @desc    Get reading
// @route   GET /api/reading/list
// @access  Private/Admin
const getReadingList = asyncHandler(async (req, res) => {
  const pageSize = 10
  const page = Number(req.query.pageNumber) || 1

  const keyword = req.query.keyword
    ? {
        paragrap: {
          $regex: req.query.keyword,
          $options: 'i', //don't care about case sensitive
        },
      }
    : {}

  const count = await Reading.count({ ...keyword }) //({ ...paragrap }) ~ ({ paragrap: ... })

  const questions = await Reading.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1))

  res.json({
    questions,
    page,
    pages: Math.ceil(count / pageSize),
  })
})

// @desc    Get reading by id
// @route   GET /api/reading/:id
// @access  Private/Admin
const getReadingById = asyncHandler(async (req, res) => {
  const question = await Reading.findById(req.params.id)

  if (question) {
    res.json(question)
  } else {
    res.status(404)
    throw new Error('Question not found')
  }
})

// @desc    Update a reading
// @route   PUT /api/reading/:id
// @access  Private/Admin
const updateReading = asyncHandler(async (req, res) => {
  const { title, require, paragrap, questions } = req.body

  const existQuestion = await Reading.findById(req.params.id)

  if (existQuestion) {
    existQuestion.title = title
    existQuestion.require = require
    existQuestion.paragrap = paragrap
    existQuestion.questions = questions

    const updatedQuestion = await existQuestion.save()
    res.json(updatedQuestion)
  } else {
    res.status(404)
    throw new Error('Question not found')
  }
})

// @desc    Create a reading
// @route   POST /api/reading
// @access  Private/Admin
const createReading = asyncHandler(async (req, res) => {
  const { title, require, paragrap, questions } = req.body

  const newQuestion = new Reading({
    title,
    require,
    paragrap,
    questions,
  })

  const createdQuestion = await newQuestion.save()
  res.status(201).json(createdQuestion)
})

// @desc    Delete question
// @route   DELETE /api/reading/:id
// @access  Private/Admin
const deleteReading = asyncHandler(async (req, res) => {
  const question = await Reading.findById(req.params.id)

  if (question) {
    await question.remove()
    res.json({ message: 'Question removed' })
  } else {
    res.status(404)
    throw new Error('Question not found')
  }
})

export const ReadingController = {
  getReadingOne,
  getReadingList,
  getReadingById,
  updateReading,
  createReading,
  deleteReading,
}
