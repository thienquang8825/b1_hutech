import mongoose from 'mongoose'

const grammarSchema = mongoose.Schema(
  {
    question: {
      type: String,
      required: true,
    },
    answers: [
      {
        answer: { type: String, required: true },
        isCorrect: { type: Boolean, required: true, default: false },
      },
    ],
  },
  {
    timestamps: true,
  }
)

const Grammar = mongoose.model('Grammar', grammarSchema)

export default Grammar
