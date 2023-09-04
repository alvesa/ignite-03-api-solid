import { PrismaCheckinsRepository } from '@/http/repositories/prisma/prisma-checkins-repository'
import { GetUserMetricsUseCase } from '../get-user-metrics'

export function makeGetUserMetricsUseCase() {
  const checkInsRepository = new PrismaCheckinsRepository()
  const useCase = new GetUserMetricsUseCase(checkInsRepository)

  return useCase
}
