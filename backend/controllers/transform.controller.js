import Transform from '../models/transform.model.js'
import asyncHandler from 'express-async-handler'

// @desc    Get list transform
// @route   GET /api/grammar
// @access  Public
const getTransformList = asyncHandler(async (req, res) => {
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

  const count = await Transform.count({ ...keyword }) //({ ...keyword }) ~ ({ question: ... })

  const questions = await Transform.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1))

  res.json({
    questions,
    page,
    pages: Math.ceil(count / pageSize),
    quantity: count,
  })
})

// @desc    Get transform by id
// @route   GET /api/transform/:id
// @access  Private/Admin
const getTransformById = asyncHandler(async (req, res) => {
  const question = await Transform.findById(req.params.id)

  if (question) {
    res.json(question)
  } else {
    res.status(404)
    throw new Error('Question not found')
  }
})

// @desc    Update a transform
// @route   PUT /api/transform/:id
// @access  Private/Admin
const updateTransform = asyncHandler(async (req, res) => {
  const { question, prefix, answer } = req.body

  const existQuestion = await Transform.findById(req.params.id)

  if (existQuestion) {
    existQuestion.question = question
    existQuestion.prefix = prefix
    existQuestion.answer = answer

    const updatedQuestion = await existQuestion.save()
    res.json(updatedQuestion)
  } else {
    res.status(404)
    throw new Error('Question not found')
  }
})

// @desc    Create a transform
// @route   POST /api/transform
// @access  Private/Admin
const createTransform = asyncHandler(async (req, res) => {
  const { question, prefix, answer } = req.body

  const newQuestion = new Transform({
    question,
    prefix,
    answer,
  })

  const createdQuestion = await newQuestion.save()
  res.status(201).json(createdQuestion)
})

// @desc    Delete transform
// @route   DELETE /api/transform/:id
// @access  Private/Admin
const deleteTransform = asyncHandler(async (req, res) => {
  const question = await Transform.findById(req.params.id)

  if (question) {
    await question.remove()
    res.json({ message: 'Question removed' })
  } else {
    res.status(404)
    throw new Error('Question not found')
  }
})

export const TransformController = {
  getTransformList,
  getTransformById,
  updateTransform,
  createTransform,
  deleteTransform,
}
