import Grammar from '../models/grammar.model.js'
import asyncHandler from 'express-async-handler'

// @desc    Get question type grammar
// @route   GET /api/grammar
// @access  Public
const getGrammar = asyncHandler(async (req, res) => {
  const pageSize = 10
  const page = Number(req.query.pageNumber) || 1

  const count = await Grammar.count({})

  const grammars = await Grammar.find({})
    .limit(pageSize)
    .skip(pageSize * (page - 1))

  res.json({
    grammars,
    page,
    pages: Math.ceil(count / pageSize),
    quantity: count,
  })
})

export const GrammarController = { getGrammar }
