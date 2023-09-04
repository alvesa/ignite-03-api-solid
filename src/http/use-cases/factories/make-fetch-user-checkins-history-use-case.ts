import { PrismaCheckinsRepository } from '@/http/repositories/prisma/prisma-checkins-repository'
import { FetchUserCheckInsHistoryUseCase } from '../fetch-user-checkins-history'

export function makeFeatchUserCheckinHistoryUseCase() {
  const checkinsRepository = new PrismaCheckinsRepository()
  const useCase = new FetchUserCheckInsHistoryUseCase(checkinsRepository)

  return useCase
}
