import { Scoring } from '../../domain/scoring/Scoring.js'
import { Score } from '../../domain/scoring/Score.js'
import { ScoringRepository } from '../../domain/scoring/ScoringRepository.js'
import { ScoringModel } from './ScoringMongooseModel.js'

export class MongooseScoringRepository implements ScoringRepository {
  async findAll(): Promise<Scoring[]> {
    const docs = await ScoringModel.find().lean().exec()
    return docs.map(
      (doc) =>
        new Scoring({
          id: doc._id.toString(),
          restaurantName: doc.restaurantName,
          contestant: doc.contestant,
          place: Score.create(doc.place),
          food: Score.create(doc.food),
          service: Score.create(doc.service),
          price: Score.create(doc.price),
        }),
    )
  }

  async findByContestant(contestant: string): Promise<Scoring[]> {
    const docs = await ScoringModel.find({ contestant }).lean().exec()
      return docs.map(
      (doc) =>
        new Scoring({
          id: doc._id.toString(),
          restaurantName: doc.restaurantName,
          contestant: doc.contestant,
          place: Score.create(doc.place),
          food: Score.create(doc.food),
          service: Score.create(doc.service),
          price: Score.create(doc.price),
        }),
    )
  }
}
