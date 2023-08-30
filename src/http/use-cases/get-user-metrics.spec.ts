import { expect, describe, it, beforeEach } from 'vitest'
import { CheckInsInMemoryRepository } from '../repositories/in-memory/in-memory-check-ins-repository'
import { GetUserMetricsUseCase } from './get-user-metrics'

let checkInRepository: CheckInsInMemoryRepository
let sut: GetUserMetricsUseCase

describe('User Metrics Use Case', () => {
  beforeEach(async () => {
    checkInRepository = new CheckInsInMemoryRepository()
    sut = new GetUserMetricsUseCase(checkInRepository)
  })

  it('should be able to get check in count from metrics', async () => {
    await checkInRepository.create({
      gym_id: 'gym-01',
      user_id: 'user-01',
    })

    await checkInRepository.create({
      gym_id: 'gym-02',
      user_id: 'user-01',
    })

    const { checkInsCount } = await sut.execute({
      userId: 'user-01',
    })

    expect(checkInsCount).toEqual(2)
  })
})
