import mongoose from 'mongoose'

const listeningSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    require: { type: String, required: true },
    paragrap: { type: String, required: true },
    question: { type: String, required: true },
    public_id: { type: String, required: true },
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

const Listening = mongoose.model('Listening', listeningSchema)

export default Listening
