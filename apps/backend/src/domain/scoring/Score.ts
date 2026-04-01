export class Score {
  readonly value: number

  constructor(value: number) {
    if (!Number.isInteger(value) || value < 0 || value > 10) {
      throw new Error(`Score must be an integer between 0 and 10, got: ${value}`)
    }
    this.value = value
  }

  static create(value: number): Score {
    return new Score(value)
  }
}
