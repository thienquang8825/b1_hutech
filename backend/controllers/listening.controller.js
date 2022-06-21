import Listening from '../models/listening.model.js'
import asyncHandler from 'express-async-handler'

// @desc    Get a listening
// @route   GET /api/listening
// @access  Public
const getListeningOne = asyncHandler(async (req, res) => {
  const page = Number(req.query.pageNumber) || 1

  const count = await Listening.count({})

  const question = await Listening.find({})
    .limit(1)
    .skip(page - 1)

  res.json({
    question,
    page,
    pages: count,
  })
})

// @desc    Get list listening
// @route   GET /api/listening/list
// @access  Private/Admin
const getListeningList = asyncHandler(async (req, res) => {
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

  const count = await Listening.count({ ...keyword }) //({ ...title }) ~ ({ title: ... })

  const questions = await Listening.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1))

  res.json({
    questions,
    page,
    pages: Math.ceil(count / pageSize),
  })
})

// @desc    Get listening by id
// @route   GET /api/listening/:id
// @access  Private/Admin
const getListeningById = asyncHandler(async (req, res) => {
  const question = await Listening.findById(req.params.id)

  if (question) {
    res.json(question)
  } else {
    res.status(404)
    throw new Error('Question not found')
  }
})

// @desc    Update a listening
// @route   PUT /api/listening/:id
// @access  Private/Admin
const updateListening = asyncHandler(async (req, res) => {
  const { title, require, paragrap, question, public_id, questions } = req.body

  const existQuestion = await Listening.findById(req.params.id)

  if (existQuestion) {
    existQuestion.title = title
    existQuestion.require = require
    existQuestion.paragrap = paragrap
    existQuestion.question = question
    existQuestion.public_id = public_id
    existQuestion.questions = questions

    const updatedQuestion = await existQuestion.save()
    res.json(updatedQuestion)
  } else {
    res.status(404)
    throw new Error('Question not found')
  }
})

// @desc    Create a listening
// @route   POST /api/listening
// @access  Private/Admin
const createListening = asyncHandler(async (req, res) => {
  const { title, require, paragrap, question, public_id, questions } = req.body

  const newQuestion = new Listening({
    title,
    require,
    paragrap,
    question,
    public_id,
    questions,
  })

  const createdQuestion = await newQuestion.save()
  res.status(201).json(createdQuestion)
})

// @desc    Delete listening
// @route   DELETE /api/listening/:id
// @access  Private/Admin
const deleteListening = asyncHandler(async (req, res) => {
  const question = await Listening.findById(req.params.id)

  if (question) {
    await question.remove()
    res.json({ message: 'Question removed' })
  } else {
    res.status(404)
    throw new Error('Question not found')
  }
})

export const ListeningController = {
  getListeningOne,
  getListeningList,
  getListeningById,
  updateListening,
  createListening,
  deleteListening,
}
