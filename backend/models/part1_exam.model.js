import mongoose from 'mongoose'
import Grammar from './grammar.model'
import Signs from './signs.model'
// import Reading from './reading.model'
// import Clozetext from './clozetext.model'
// import Transform from './transform.model'

const grammarExamSchema = mongoose.Schema(
  {
    exam: { type: String, required: true },
    questions: {
      grammar: {
        require: {
          type: String,
          default:
            'Circle the letter next to the word or the phrase which best completes the sentence',
        },
        grammars: [Grammar],
      },
      signs: {
        require: {
          type: String,
          default:
            'Look at the text in each question. What does it say? Circle the letter next to the correct explanation',
        },
        signs: [Signs],
      },
    },
  },
  {
    timestamps: true,
  }
)

const Grammar = mongoose.model('VocabularyGrammar', grammarExamSchema)

export default Grammar
