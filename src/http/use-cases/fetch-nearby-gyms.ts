import { Gym } from '@prisma/client'
import { GymsRepository } from '../repositories/gyms-repository'

interface FeatchNearbyGymsUseCaseRequest {
  userLatitude: number
  userLongitude: number
}

interface FeatchNearbyGymsUseCaseResponse {
  gyms: Gym[]
}

export class FeatchNearbyGymsUseCase {
  constructor(private gymsRepository: GymsRepository) {}

  async execute({
    userLatitude,
    userLongitude,
  }: FeatchNearbyGymsUseCaseRequest): Promise<FeatchNearbyGymsUseCaseResponse> {
    const gyms = await this.gymsRepository.findManyNearBy({
      latitude: userLatitude,
      longitude: userLongitude,
    })

    return { gyms }
  }
}
