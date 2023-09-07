import { expect, describe, it, beforeEach, vi, afterEach } from 'vitest'
import { CheckInsInMemoryRepository } from '../repositories/in-memory/in-memory-check-ins-repository'
import { ValidateCheckInUseCase } from './validate-checkin'
import { ResourceNotFoundError } from './errors/resource-not-found'
import { LateCheckInValidateError } from './errors/late-checkin-validate-error'

let checkInRepository: CheckInsInMemoryRepository
let sut: ValidateCheckInUseCase

describe('Check-in Use Case', () => {
  beforeEach(async () => {
    checkInRepository = new CheckInsInMemoryRepository()
    sut = new ValidateCheckInUseCase(checkInRepository)

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to validate the check in', async () => {
    const createdCheckIn = await checkInRepository.create({
      gym_id: 'gym-01',
      user_id: 'user-01',
    })

    const { checkIn } = await sut.execute({
      checkInId: createdCheckIn.id,
    })

    expect(checkIn.validated_at).toEqual(expect.any(Date))
    expect(checkInRepository.checkIns[0].validated_at).toEqual(expect.any(Date))
  })

  it('should not be able to validate an inexistent check in', async () => {
    await expect(() =>
      sut.execute({
        checkInId: 'unexistent-check-in-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })

  it('should not be able to validate the check in after 20 minutes of its own creation', async () => {
    vi.setSystemTime(new Date(2023, 0, 1, 13, 40))

    const createdCheckIn = await checkInRepository.create({
      gym_id: 'gym-01',
      user_id: 'user-01',
    })

    const twentOneMinutesInMs = 1000 * 60 * 21

    vi.advanceTimersByTime(twentOneMinutesInMs)

    await expect(() =>
      sut.execute({ checkInId: createdCheckIn.id }),
    ).rejects.toBeInstanceOf(LateCheckInValidateError)
  })
})
