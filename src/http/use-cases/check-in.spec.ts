import { expect, describe, it, beforeEach } from 'vitest'
import { CheckInsInMemoryRepository } from '../repositories/in-memory/in-memory-check-ins-repository'
import { CheckInUseCase } from './checkin'

let checkInRepository: CheckInsInMemoryRepository
let sut: CheckInUseCase

describe('Check-in Use Case', () => {
  beforeEach(() => {
    checkInRepository = new CheckInsInMemoryRepository()
    sut = new CheckInUseCase(checkInRepository)
  })
  it('should be able to check in', async () => {
    const { checkIn } = await sut.execute({
      userId: 'gym-01',
      gymId: 'user-01',
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })
})
