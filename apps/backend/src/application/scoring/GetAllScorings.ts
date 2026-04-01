import { ScoringRepository } from '../../domain/scoring/ScoringRepository.js'

export interface ScoringDTO {
  id: string
  restaurantName: string
  contestant: string
  place: number
  food: number
  service: number
  price: number
}

export class GetAllScorings {
  readonly repository: ScoringRepository

  constructor(repository: ScoringRepository) {
    this.repository = repository
  }

  async execute(): Promise<ScoringDTO[]> {
    const scorings = await this.repository.findAll()
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
