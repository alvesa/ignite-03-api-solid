import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryGymsRepository } from '../repositories/in-memory/in-memory-gyms-repository'
import { CreateGymUseCase } from './create-gym'

let gymsRepository: InMemoryGymsRepository
let createGymUseCase: CreateGymUseCase

beforeEach(() => {
  gymsRepository = new InMemoryGymsRepository()
  createGymUseCase = new CreateGymUseCase(gymsRepository)
})

describe('Create Gym Use Case', () => {
  it('should be able to create a gym', async () => {
    const { gym } = await createGymUseCase.execute({
      title: 'Js Gym',
      description: null,
      phone: null,
      latitude: -27.2092052,
      longitude: -49.6401091,
    })

    expect(gym.id).toEqual(expect.any(String))
  })
})
