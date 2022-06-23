import mongoose from 'mongoose'

const speakingSchema = mongoose.Schema(
  {
    topic: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
  },
  {
    timestamps: true,
  }
)

const Speaking = mongoose.model('Speaking', speakingSchema)

export default Speaking
