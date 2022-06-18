import Signs from '../models/signs.model.js'
import asyncHandler from 'express-async-handler'

// @desc    Get signs
// @route   GET /api/signs/list
// @access  Public
const getSignsList = asyncHandler(async (req, res) => {
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

  const count = await Signs.count({ ...keyword }) //({ ...keyword }) ~ ({ question: ... })

  const questions = await Signs.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1))

  res.json({
    questions,
    page,
    pages: Math.ceil(count / pageSize),
    quantity: count,
  })
})

// @desc    Get signs by id
// @route   GET /api/signs/:id
// @access  Private/Admin
const getSignsById = asyncHandler(async (req, res) => {
  const question = await Signs.findById(req.params.id)

  if (question) {
    res.json(question)
  } else {
    res.status(404)
    throw new Error('Question not found')
  }
})

// @desc    Update a signs
// @route   PUT /api/signs/:id
// @access  Private/Admin
const updateSigns = asyncHandler(async (req, res) => {
  const { question, public_id, answers } = req.body

  const existQuestion = await Signs.findById(req.params.id)

  if (existQuestion) {
    existQuestion.question = question
    existQuestion.public_id = public_id
    existQuestion.answers = answers

    const updatedQuestion = await existQuestion.save()
    res.json(updatedQuestion)
  } else {
    res.status(404)
    throw new Error('Question not found')
  }
})

// @desc    Create a signs
// @route   POST /api/signs
// @access  Private/Admin
const createSigns = asyncHandler(async (req, res) => {
  const { question, public_id, answers } = req.body

  const newQuestion = new Signs({
    question,
    public_id,
    answers,
  })

  const createdQuestion = await newQuestion.save()
  res.status(201).json(createdQuestion)
})

// @desc    Delete signs
// @route   DELETE /api/signs/:id
// @access  Private/Admin
const deleteSigns = asyncHandler(async (req, res) => {
  const question = await Signs.findById(req.params.id)

  if (question) {
    await question.remove()
    res.json({ message: 'Question removed' })
  } else {
    res.status(404)
    throw new Error('Question not found')
  }
})

export const SignsController = {
  getSignsList,
  getSignsById,
  updateSigns,
  createSigns,
  deleteSigns,
}
