import { Scoring } from './Scoring.js'

export interface ScoringRepository {
  findAll(): Promise<Scoring[]>
}
