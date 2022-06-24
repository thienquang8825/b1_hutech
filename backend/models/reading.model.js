import mongoose from 'mongoose'

const readingSchema = mongoose.Schema(
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
            isCorrect: { type: Boolean, required: true, default: false },
          },
        ],
      },
    ],
  },
  {
    timestamps: true,
  }
)

const Reading = mongoose.model('ReadingComprehension', readingSchema)

export default Reading
