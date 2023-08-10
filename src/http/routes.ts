import { prisma } from '@/lib/prisma'
import { register } from './controllers/register'
import { FastifyInstance } from 'fastify'

export async function appRoutes(app: FastifyInstance) {
  app.post('/users', register)

  app.get('/users', async (req, res) => {
    const users = await prisma.user.findMany()
    return res.status(200).send({ users })
  })
}
