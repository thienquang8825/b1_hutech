import mongoose from 'mongoose'

const transformSchema = mongoose.Schema(
  {
    question: {
      type: String,
      required: true,
    },
    prefix: {
      type: String,
      required: true,
    },
    answer: {
      type: String,
      required: true,
    },
    suffix: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

const Transform = mongoose.model('SentenceTransformation', transformSchema)

export default Transform
