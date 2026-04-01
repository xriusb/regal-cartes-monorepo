import { ScoringRepository } from '../../domain/scoring/ScoringRepository.js'

export interface ScoringDTO {
  id: string
  restaurantName: string
  contestant: string
  place: number | null
  food: number | null
  service: number | null
  price: number | null
}

export class GetScoringsByContestant {
  readonly repository: ScoringRepository

  constructor(repository: ScoringRepository) {
    this.repository = repository
  }

  async execute(contestant: string): Promise<ScoringDTO[]> {
    const scorings = await this.repository.findByContestant(contestant)
    return scorings.map((scoring) => ({
      id: scoring.id,
      restaurantName: scoring.restaurantName,
      contestant: scoring.contestant,
      place: scoring.place.value,
      food: scoring.food.value,
      service: scoring.service.value,
      price: scoring.price.value,
    }))
  }
}
