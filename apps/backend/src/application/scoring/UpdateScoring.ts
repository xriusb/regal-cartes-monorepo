import { ScoreUpdate, ScoringRepository } from '../../domain/scoring/ScoringRepository.js'

export interface ScoringDTO {
  id: string
  restaurantName: string
  contestant: string
  place: number | null
  food: number | null
  service: number | null
  price: number | null
}

export class UpdateScoring {
  readonly repository: ScoringRepository

  constructor(repository: ScoringRepository) {
    this.repository = repository
  }

  async execute(id: string, scores: ScoreUpdate): Promise<ScoringDTO> {
    const scoring = await this.repository.update(id, scores)
    return {
      id: scoring.id,
      restaurantName: scoring.restaurantName,
      contestant: scoring.contestant,
      place: scoring.place.value,
      food: scoring.food.value,
      service: scoring.service.value,
      price: scoring.price.value,
    }
  }
}
