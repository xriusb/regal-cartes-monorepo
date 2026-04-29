import dotenv from 'dotenv'
dotenv.config()

import mongoose from 'mongoose'
import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { MongooseScoringRepository } from './infrastructure/scoring/MongooseScoringRepository.js'
import { GetAllScorings } from './application/scoring/GetAllScorings.js'
import { GetScoringsByContestant } from './application/scoring/GetScoringsByContestant.js'
import { UpdateScoring } from './application/scoring/UpdateScoring.js'
import { CreateScoring } from './application/scoring/CreateScoring.js'
import { createScoringRouter } from './api/scoring/scoringRouter.js'

async function main() {
  const mongoUri = process.env.MONGODB_URI
  if (!mongoUri) {
    throw new Error('MONGODB_URI environment variable is required')
  }

  await mongoose.connect(mongoUri)

  const repository = new MongooseScoringRepository()
  const getAllScorings = new GetAllScorings(repository)
  const getScoringsByContestant = new GetScoringsByContestant(repository)
  const updateScoring = new UpdateScoring(repository)
  const createScoring = new CreateScoring(repository)
  const scoringRouter = createScoringRouter(getAllScorings, getScoringsByContestant, updateScoring, createScoring)

  const app = new Hono()
  const allowedOrigins = (process.env.ALLOWED_ORIGINS ?? 'http://localhost:5173').split(',')
  app.use('*', cors({ origin: allowedOrigins }))
  app.route('/api', scoringRouter)

  const port = Number(process.env.PORT ?? 3000)
  serve({ fetch: app.fetch, port })
  console.log(`Server running on port ${port}`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
