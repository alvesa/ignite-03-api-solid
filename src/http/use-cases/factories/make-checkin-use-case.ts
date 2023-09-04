import { PrismaCheckinsRepository } from '@/http/repositories/prisma/prisma-checkins-repository'
import { PrismaGymsRepository } from '@/http/repositories/prisma/prisma-gyms-repository'
import { CheckInUseCase } from '../checkin'

export function makeCheckinUseCase() {
  const checkinsRepository = new PrismaCheckinsRepository()
  const gymsRepository = new PrismaGymsRepository()
  const useCase = new CheckInUseCase(checkinsRepository, gymsRepository)

  return useCase
}
