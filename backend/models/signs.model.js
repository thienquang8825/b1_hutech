import mongoose from 'mongoose'

const signsSchema = mongoose.Schema(
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

const Signs = mongoose.model('Signs', signsSchema)

export default Signs
