import { Hono } from 'hono'
import { GetAllScorings } from '../../application/scoring/GetAllScorings.js'

export function createScoringRouter(getAllScorings: GetAllScorings): Hono {
  const router = new Hono()

  router.get('/scorings', async (c) => {
    const scorings = await getAllScorings.execute()
    return c.json(scorings)
  })

  return router
}
