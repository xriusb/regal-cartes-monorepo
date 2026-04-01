import mongoose from 'mongoose'

interface ScoringDocument extends mongoose.Document {
  restaurantName: string
  contestant: string
  place: number
  food: number
  service: number
  price: number
}

const scoringSchema = new mongoose.Schema<ScoringDocument>({
  restaurantName: { type: String, required: true },
  contestant: { type: String, required: true },
  place: { type: Number, required: true, min: 1, max: 10 },
  food: { type: Number, required: true, min: 1, max: 10 },
  service: { type: Number, required: true, min: 1, max: 10 },
  price: { type: Number, required: true, min: 1, max: 10 },
})

export const ScoringModel = mongoose.model<ScoringDocument>('Scoring', scoringSchema)
