import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repository'
import { FeatchNearbyGymsUseCase } from '../fetch-nearby-gyms'

export function makeFeatchNearbyGymsUseCase() {
  const gymsRepository = new PrismaGymsRepository()
  const useCase = new FeatchNearbyGymsUseCase(gymsRepository)

  return useCase
}
