import { makeValidateCheckinUseCase } from '@/use-cases/factories/make-validate-checkin-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function validate(req: FastifyRequest, reply: FastifyReply) {
  const validateCheckInParamsSchema = z.object({
    checkInId: z.string().uuid(),
  })

  const { checkInId } = validateCheckInParamsSchema.parse(req.body)

  const validateCheckinUseCase = makeValidateCheckinUseCase()
  await validateCheckinUseCase.execute({
    checkInId,
  })

  return reply.status(204).send()
}
