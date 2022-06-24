import mongoose from 'mongoose'
import Grammar from './grammar.model.js'
import Signs from './signs.model.js'
// import Reading from './reading.model'
// import Clozetext from './clozetext.model'
// import Transform from './transform.model'

const part1Schema = mongoose.Schema(
  {
    title: { type: String, required: true },
    questions: {
      grammar: {
        require: {
          type: String,
          default:
            'Circle the letter next to the word or the phrase which best completes the sentence.',
        },
        grammars: [
          {
            question: { type: String, required: true },
            answers: [
              {
                answer: { type: String, required: true },
                isCorrect: { type: Boolean, required: true, default: false },
              },
            ],
          },
        ],
      },
      signs: {
        require: {
          type: String,
          default:
            'Look at the text in each question. What does it say? Circle the letter next to the correct explanation.',
        },
        signs: [
          {
            question: { type: String, required: true },
            public_id: { type: String, required: true },
            answers: [
              {
                answer: { type: String, required: true },
                isCorrect: { type: Boolean, required: true, default: false },
              },
            ],
          },
        ],
      },
      reading: {
        require: {
          type: String,
          default:
            'Read the text and the questions below. For each question, circle the letter next to the correct answer.',
        },
        readings: [
          {
            title: { type: String, required: true },
            require: { type: String, required: true },
            paragrap: { type: String, required: true },
            questions: [
              {
                question: {
                  type: String,
                  required: true,
                },
                answers: [
                  {
                    answer: { type: String, required: true },
                    isCorrect: {
                      type: Boolean,
                      required: true,
                      default: false,
                    },
                  },
                ],
              },
            ],
          },
        ],
      },
      clozetext: {
        require: {
          type: String,
          default:
            'Fill each of the numbered blanks in the following passage. You must choose the one which you think fits best, indicate on your answer sheet the letter A, B, C or D against the number of the blank.',
        },
        clozetexts: [
          {
            title: { type: String, required: true },
            require: { type: String, required: true },
            paragrap: { type: String, required: true },
            questions: [
              {
                answers: [
                  {
                    answer: { type: String, required: true },
                    isCorrect: {
                      type: Boolean,
                      required: true,
                      default: false,
                    },
                  },
                ],
              },
            ],
          },
        ],
      },
      transform: {
        require: {
          type: String,
          default:
            'Finish each of the following sentences in such a way that it means exactly the same as the sentence printed before it.',
        },
        transforms: [
          {
            question: { type: String, required: true },
            prefix: { type: String, required: true },
            answer: { type: String, required: true },
          },
        ],
      },
    },
  },
  {
    timestamps: true,
  }
)

const Part1 = mongoose.model('Part1', part1Schema)

export default Part1
