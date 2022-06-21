import Clozetext from '../models/clozetext.model.js'
import asyncHandler from 'express-async-handler'

// @desc    Get a clozetext
// @route   GET /api/clozetext
// @access  Public
const getClozetextOne = asyncHandler(async (req, res) => {
  const page = Number(req.query.pageNumber) || 1

  const count = await Clozetext.count({})

  const question = await Clozetext.find({})
    .limit(1)
    .skip(page - 1)

  res.json({
    question,
    page,
    pages: count,
  })
})

// @desc    Get list clozetext
// @route   GET /api/clozetext/list
// @access  Private/Admin
const getClozetextList = asyncHandler(async (req, res) => {
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

  const count = await Clozetext.count({ ...keyword }) //({ ...title }) ~ ({ title: ... })

  const questions = await Clozetext.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1))

  res.json({
    questions,
    page,
    pages: Math.ceil(count / pageSize),
  })
})

// @desc    Get clozetext by id
// @route   GET /api/clozetext/:id
// @access  Private/Admin
const getClozetextById = asyncHandler(async (req, res) => {
  const question = await Clozetext.findById(req.params.id)

  if (question) {
    res.json(question)
  } else {
    res.status(404)
    throw new Error('Question not found')
  }
})

// @desc    Update a clozetext
// @route   PUT /api/clozetext/:id
// @access  Private/Admin
const updateClozetext = asyncHandler(async (req, res) => {
  const { title, require, paragrap, questions } = req.body

  const existQuestion = await Clozetext.findById(req.params.id)

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

// @desc    Create a clozetext
// @route   POST /api/clozetext
// @access  Private/Admin
const createClozetext = asyncHandler(async (req, res) => {
  const { title, require, paragrap, questions } = req.body

  const newQuestion = new Clozetext({
    title,
    require,
    paragrap,
    questions,
  })

  const createdQuestion = await newQuestion.save()
  res.status(201).json(createdQuestion)
})

// @desc    Delete clozetext
// @route   DELETE /api/clozetext/:id
// @access  Private/Admin
const deleteClozetext = asyncHandler(async (req, res) => {
  const question = await Clozetext.findById(req.params.id)

  if (question) {
    await question.remove()
    res.json({ message: 'Question removed' })
  } else {
    res.status(404)
    throw new Error('Question not found')
  }
})

export const ClozetextController = {
  getClozetextOne,
  getClozetextList,
  getClozetextById,
  updateClozetext,
  createClozetext,
  deleteClozetext,
}
