import mongoose from 'mongoose'

const clozetextSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    require: { type: String, required: true },
    paragrap: { type: String, required: true },
    questions: [
      {
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

const Clozetext = mongoose.model('Clozetext', clozetextSchema)

export default Clozetext
