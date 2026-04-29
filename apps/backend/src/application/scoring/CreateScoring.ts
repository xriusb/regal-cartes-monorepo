import { ScoringRepository } from '../../domain/scoring/ScoringRepository.js'

interface ScoringDTO {
  id: string
  restaurantName: string
  contestant: string
  place: number | null
  food: number | null
  service: number | null
  price: number | null
}

export class CreateScoring {
  readonly repository: ScoringRepository

  constructor(repository: ScoringRepository) {
    this.repository = repository
  }

  async execute(restaurantName: string, contestant: string): Promise<ScoringDTO> {
    const scoring = await this.repository.create(restaurantName, contestant)
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
