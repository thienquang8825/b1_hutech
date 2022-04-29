import Grammar from '../models/grammar.model.js'
import asyncHandler from 'express-async-handler'

// @desc    Get grammar
// @route   GET /api/grammar
// @access  Public
const getGrammar = asyncHandler(async (req, res) => {
  const pageSize = 10
  const page = Number(req.query.pageNumber) || 1

  const count = await Grammar.count({})

  const questions = await Grammar.find({})
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
// @access  Public
const getGrammarById = asyncHandler(async (req, res) => {
  const question = await Grammar.findById(req.params.id)

  if (question) {
    res.json(question)
  } else {
    res.status(404)
    throw new Error('Question not found')
  }
})

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateGrammar = asyncHandler(async (req, res) => {
  const { question, answers } = req.body

  const q = await Grammar.findById(req.params.id)

  if (q) {
    q.question = question
    q.answers = answers

    const updatedQuestion = await q.save()
    res.json(updatedQuestion)
  } else {
    res.status(404)
    throw new Error('Question not found')
  }
})

// @desc    Delete question
// @route   DELETE /api/grammar/:id
// @access  Private/Admin
const deleteGrammar = asyncHandler(async (req, res) => {
  const question = await Grammar.findById(req.params.id)

  if (product) {
    await question.remove()
    res.json({ message: 'Question removed' })
  } else {
    res.status(404)
    throw new Error('Question not found')
  }
})

export const GrammarController = {
  getGrammar,
  getGrammarById,
  updateGrammar,
  deleteGrammar,
}
