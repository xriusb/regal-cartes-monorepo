import { Score } from './Score.js'

export interface ScoringProps {
  id: string
  restaurantName: string
  contestant: string
  place: Score
  food: Score
  service: Score
  price: Score
}

export class Scoring {
  readonly id: string
  readonly restaurantName: string
  readonly contestant: string
  readonly place: Score
  readonly food: Score
  readonly service: Score
  readonly price: Score

  constructor(props: ScoringProps) {
    this.id = props.id
    this.restaurantName = props.restaurantName
    this.contestant = props.contestant
    this.place = props.place
    this.food = props.food
    this.service = props.service
    this.price = props.price
  }
}
