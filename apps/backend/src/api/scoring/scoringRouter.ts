import { Hono } from 'hono'
import { GetAllScorings } from '../../application/scoring/GetAllScorings.js'
import { GetScoringsByContestant } from '../../application/scoring/GetScoringsByContestant.js'
import { UpdateScoring } from '../../application/scoring/UpdateScoring.js'
import { CreateScoring } from '../../application/scoring/CreateScoring.js'

export function createScoringRouter(
  getAllScorings: GetAllScorings,
  getScoringsByContestant: GetScoringsByContestant,
  updateScoring: UpdateScoring,
  createScoring: CreateScoring,
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

  router.post('/contestants/:contestant/scorings', async (c) => {
    const contestant = c.req.param('contestant')
    const { restaurantName } = await c.req.json()
    const result = await createScoring.execute(restaurantName, contestant)
    return c.json(result, 201)
  })

  router.put('/scorings/:id', async (c) => {
    const id = c.req.param('id')
    const body = await c.req.json()
    const result = await updateScoring.execute(id, body)
    return c.json(result)
  })

  return router
}
