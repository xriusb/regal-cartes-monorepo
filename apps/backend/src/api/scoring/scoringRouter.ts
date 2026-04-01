import { Hono } from 'hono'
import { GetAllScorings } from '../../application/scoring/GetAllScorings.js'
import { GetScoringsByContestant } from '../../application/scoring/GetScoringsByContestant.js'

export function createScoringRouter(
  getAllScorings: GetAllScorings,
  getScoringsByContestant: GetScoringsByContestant,
): Hono {
  const router = new Hono()

  router.get('/scorings', async (c) => {
    const scorings = await getAllScorings.execute()
    return c.json(scorings)
  })

  router.get('/contestants/:contestant/scorings', async (c) => {
    const contestant = c.req.param('contestant')
    const scorings = await getScoringsByContestant.execute(contestant)
    return c.json(scorings)
  })

  return router
}
