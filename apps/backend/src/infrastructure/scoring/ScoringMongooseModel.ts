import mongoose from 'mongoose'

interface ScoringDocument extends mongoose.Document {
  restaurantName: string
  contestant: string
  place: number | null
  food: number | null
  service: number | null
  price: number | null
}

const scoringSchema = new mongoose.Schema<ScoringDocument>({
  restaurantName: { type: String, required: true },
  contestant: { type: String, required: true },
  place:   { type: Number, required: false, default: null, min: 0, max: 10 },
  food:    { type: Number, required: false, default: null, min: 0, max: 10 },
  service: { type: Number, required: false, default: null, min: 0, max: 10 },
  price:   { type: Number, required: false, default: null, min: 0, max: 10 },
})

export const ScoringModel = mongoose.model<ScoringDocument>('Scoring', scoringSchema)
