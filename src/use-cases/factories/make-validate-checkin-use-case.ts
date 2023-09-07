import { PrismaCheckinsRepository } from '@/repositories/prisma/prisma-checkins-repository'
import { ValidateCheckInUseCase } from '../validate-checkin'

export function makeValidateCheckinUseCase() {
  const checkinsRepository = new PrismaCheckinsRepository()
  const useCase = new ValidateCheckInUseCase(checkinsRepository)

  return useCase
}
