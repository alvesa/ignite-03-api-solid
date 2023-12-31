import { FastifyInstance } from 'fastify'
import { verifyJWT } from '../../middlewares/verify-jwt'
import { create } from './create'
import { validate } from './validate'
import { metrics } from './metrics'
import { history } from './history'
import { verifyUserRole } from '@/http/middlewares/only-admin'

export async function checkInsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)

  app.get('/checkins/histoty', history)
  app.get('/checkins/metrics', metrics)
  app.post('/gyms/:gymId/checkins', create)

  app.patch(
    '/checkins/:checkInId/validate',
    { onRequest: [verifyUserRole('ADMIN')] },
    validate,
  )
}
