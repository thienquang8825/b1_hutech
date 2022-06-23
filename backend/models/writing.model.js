import mongoose from 'mongoose'

const writingSchema = mongoose.Schema(
  {
    topic: { type: String, required: true },
    description: { type: String, required: true },
  },
  {
    timestamps: true,
  }
)

const Writing = mongoose.model('Writing', writingSchema)

export default Writing
