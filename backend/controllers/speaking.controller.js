import Speaking from '../models/speaking.model.js'
import asyncHandler from 'express-async-handler'

// @desc    Get list speaking
// @route   GET /api/speaking
// @access  Public
const getSpeakingList = asyncHandler(async (req, res) => {
  const pageSize = 10
  const page = Number(req.query.pageNumber) || 1

  const keyword = req.query.keyword
    ? {
        title: {
          $regex: req.query.keyword,
          $options: 'i', //don't care about case sensitive
        },
      }
    : {}

  const count = await Speaking.count({ ...keyword }) //({ ...keyword }) ~ ({ title: ... })

  const questions = await Speaking.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1))

  res.json({
    questions,
    page,
    pages: Math.ceil(count / pageSize),
    quantity: count,
  })
})

// @desc    Get speaking by id
// @route   GET /api/speaking/:id
// @access  Private/Admin
const getSpeakingById = asyncHandler(async (req, res) => {
  const question = await Speaking.findById(req.params.id)

  if (question) {
    res.json(question)
  } else {
    res.status(404)
    throw new Error('Question not found')
  }
})

// @desc    Update a speaking
// @route   PUT /api/speaking/:id
// @access  Private/Admin
const updateSpeaking = asyncHandler(async (req, res) => {
  const { topic, title, description } = req.body

  const existQuestion = await Speaking.findById(req.params.id)

  if (existQuestion) {
    existQuestion.topic = topic
    existQuestion.title = title
    existQuestion.description = description

    const updatedQuestion = await existQuestion.save()
    res.json(updatedQuestion)
  } else {
    res.status(404)
    throw new Error('Question not found')
  }
})

// @desc    Create a speaking
// @route   POST /api/speaking
// @access  Private/Admin
const createSpeaking = asyncHandler(async (req, res) => {
  const { topic, title, description } = req.body

  const newQuestion = new Speaking({
    topic,
    title,
    description,
  })

  const createdQuestion = await newQuestion.save()
  res.status(201).json(createdQuestion)
})

// @desc    Delete speaking
// @route   DELETE /api/speaking/:id
// @access  Private/Admin
const deleteSpeaking = asyncHandler(async (req, res) => {
  const question = await Speaking.findById(req.params.id)

  if (question) {
    await question.remove()
    res.json({ message: 'Question removed' })
  } else {
    res.status(404)
    throw new Error('Question not found')
  }
})

export const SpeakingController = {
  getSpeakingList,
  getSpeakingById,
  updateSpeaking,
  createSpeaking,
  deleteSpeaking,
}
