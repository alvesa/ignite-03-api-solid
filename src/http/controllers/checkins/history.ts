import { makeFeatchUserCheckinHistoryUseCase } from '@/use-cases/factories/make-fetch-user-checkins-history-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function history(req: FastifyRequest, reply: FastifyReply) {
  const checkInHistoryBodySchema = z.object({
    page: z.coerce.number().min(1).default(1),
  })

  const { page } = checkInHistoryBodySchema.parse(req.query)

  const fetchUserCheckInsHistoryUseCase = makeFeatchUserCheckinHistoryUseCase()

  const { checkIns } = await fetchUserCheckInsHistoryUseCase.execute({
    userId: req.user.sub,
    page,
  })

  return reply.status(200).send({ checkIns })
}
