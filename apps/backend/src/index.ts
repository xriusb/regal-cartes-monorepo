import dotenv from 'dotenv'
dotenv.config()

import mongoose from 'mongoose'
import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { MongooseScoringRepository } from './infrastructure/scoring/MongooseScoringRepository.js'
import { GetAllScorings } from './application/scoring/GetAllScorings.js'
import { createScoringRouter } from './api/scoring/scoringRouter.js'

async function main() {
  const mongoUri = process.env.MONGODB_URI
  if (!mongoUri) {
    throw new Error('MONGODB_URI environment variable is required')
  }

  await mongoose.connect(mongoUri)

  const repository = new MongooseScoringRepository()
  const getAllScorings = new GetAllScorings(repository)
  const scoringRouter = createScoringRouter(getAllScorings)

  const app = new Hono()
  app.route('/api', scoringRouter)

  const port = Number(process.env.PORT ?? 3000)
  serve({ fetch: app.fetch, port })
  console.log(`Server running on port ${port}`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
