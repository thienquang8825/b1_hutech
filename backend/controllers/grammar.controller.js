import Grammar from '../models/grammar.model.js'
import asyncHandler from 'express-async-handler'

// @desc    Get grammar
// @route   GET /api/grammar
// @access  Public
const getGrammarList = asyncHandler(async (req, res) => {
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

  const count = await Grammar.count({ ...keyword }) //({ ...keyword }) ~ ({ question: ... })

  const questions = await Grammar.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1))

  res.json({
    questions,
    page,
    pages: Math.ceil(count / pageSize),
    quantity: count,
  })
})

// @desc    Get grammar by id
// @route   GET /api/grammar/:id
// @access  Private/Admin
const getGrammarById = asyncHandler(async (req, res) => {
  const question = await Grammar.findById(req.params.id)

  if (question) {
    res.json(question)
  } else {
    res.status(404)
    throw new Error('Question not found')
  }
})

// @desc    Update a grammar
// @route   PUT /api/grammar/:id
// @access  Private/Admin
const updateGrammar = asyncHandler(async (req, res) => {
  const { question, answers } = req.body

  const existQuestion = await Grammar.findById(req.params.id)

  if (existQuestion) {
    existQuestion.question = question
    existQuestion.answers = answers

    const updatedQuestion = await existQuestion.save()
    res.json(updatedQuestion)
  } else {
    res.status(404)
    throw new Error('Question not found')
  }
})

// @desc    Create a grammar
// @route   POST /api/grammar
// @access  Private/Admin
const createGrammar = asyncHandler(async (req, res) => {
  const { question, answers } = req.body

  console.log(answers)

  const newQuestion = new Grammar({
    question,
    answers,
  })

  const createdQuestion = await newQuestion.save()
  res.status(201).json(createdQuestion)
})

// @desc    Delete question
// @route   DELETE /api/grammar/:id
// @access  Private/Admin
const deleteGrammar = asyncHandler(async (req, res) => {
  const question = await Grammar.findById(req.params.id)

  if (question) {
    await question.remove()
    res.json({ message: 'Question removed' })
  } else {
    res.status(404)
    throw new Error('Question not found')
  }
})

export const GrammarController = {
  getGrammarList,
  getGrammarById,
  updateGrammar,
  createGrammar,
  deleteGrammar,
}
