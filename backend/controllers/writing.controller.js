import Writing from '../models/writing.model.js'
import asyncHandler from 'express-async-handler'

// @desc    Get list writing
// @route   GET /api/writing
// @access  Public
const getWritingList = asyncHandler(async (req, res) => {
  const pageSize = 10
  const page = Number(req.query.pageNumber) || 1

  const keyword = req.query.keyword
    ? {
        description: {
          $regex: req.query.keyword,
          $options: 'i', //don't care about case sensitive
        },
      }
    : {}

  const count = await Writing.count({ ...keyword }) //({ ...keyword }) ~ ({ description: ... })

  const questions = await Writing.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1))

  res.json({
    questions,
    page,
    pages: Math.ceil(count / pageSize),
    quantity: count,
  })
})

// @desc    Get writing by id
// @route   GET /api/writing/:id
// @access  Private/Admin
const getWritingById = asyncHandler(async (req, res) => {
  const question = await Writing.findById(req.params.id)

  if (question) {
    res.json(question)
  } else {
    res.status(404)
    throw new Error('Question not found')
  }
})

// @desc    Update a writing
// @route   PUT /api/writing/:id
// @access  Private/Admin
const updateWriting = asyncHandler(async (req, res) => {
  const { topic, description } = req.body

  const existQuestion = await Writing.findById(req.params.id)

  if (existQuestion) {
    existQuestion.topic = topic
    existQuestion.description = description

    const updatedQuestion = await existQuestion.save()
    res.json(updatedQuestion)
  } else {
    res.status(404)
    throw new Error('Question not found')
  }
})

// @desc    Create a writing
// @route   POST /api/writing
// @access  Private/Admin
const createWriting = asyncHandler(async (req, res) => {
  const { topic, description } = req.body

  const newQuestion = new Writing({
    topic,
    description,
  })

  const createdQuestion = await newQuestion.save()
  res.status(201).json(createdQuestion)
})

// @desc    Delete writing
// @route   DELETE /api/writing/:id
// @access  Private/Admin
const deleteWriting = asyncHandler(async (req, res) => {
  const question = await Writing.findById(req.params.id)

  if (question) {
    await question.remove()
    res.json({ message: 'Question removed' })
  } else {
    res.status(404)
    throw new Error('Question not found')
  }
})

export const WritingController = {
  getWritingList,
  getWritingById,
  updateWriting,
  createWriting,
  deleteWriting,
}
