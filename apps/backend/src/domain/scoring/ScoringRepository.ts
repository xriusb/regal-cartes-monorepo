import { Scoring } from './Scoring.js'

export interface ScoreUpdate {
  place: number
  food: number
  service: number
  price: number
}

export interface ScoringRepository {
  findAll(): Promise<Scoring[]>
  findByContestant(contestant: string): Promise<Scoring[]>
  update(id: string, scores: ScoreUpdate): Promise<Scoring>
}
