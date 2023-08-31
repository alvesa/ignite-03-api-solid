import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryGymsRepository } from '../repositories/in-memory/in-memory-gyms-repository'
import { SearchGymUseCase } from './search-gym'
import { FeatchNearbyGymsUseCase } from './fetch-nearby-gyms'

let gymsRepository: InMemoryGymsRepository
let featchNearbyGymsUseCase: FeatchNearbyGymsUseCase

beforeEach(() => {
  gymsRepository = new InMemoryGymsRepository()
  featchNearbyGymsUseCase = new FeatchNearbyGymsUseCase(gymsRepository)
})

describe('Featch NearBy Gym Use Case', () => {
  it('should be able to featch nearby gyms', async () => {
    await gymsRepository.create({
      title: 'Near Gym',
      description: null,
      phone: null,
      latitude: -27.2092052,
      longitude: -49.6401091,
    })

    await gymsRepository.create({
      title: 'Far Gym',
      description: null,
      phone: null,
      latitude: -27.0610928,
      longitude: -49.5229501,
    })

    const { gyms } = await featchNearbyGymsUseCase.execute({
      userLatitude: -27.2092052,
      userLongitude: -49.6401091,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: 'Near Gym' })])
  })
})
