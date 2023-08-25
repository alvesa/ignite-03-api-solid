import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryUserRepository } from '../repositories/in-memory/in-memory-users-repository'
import bcryptjs from 'bcryptjs'
import { GetUserProfileUseCase } from './get-user-profile'
import { ResourceNotFoundError } from './errors/resource-not-found'

let usersRepository: InMemoryUserRepository
let sut: GetUserProfileUseCase

beforeEach(() => {
  usersRepository = new InMemoryUserRepository()
  sut = new GetUserProfileUseCase(usersRepository)
})

describe('Get User Use Case', () => {
  it('should be able to get user profile', async () => {
    const createdUser = await usersRepository.create({
      name: 'John Doe',
      email: 'email123@email.com',
      password_hash: await bcryptjs.hash('123456789', 6),
    })

    const { user } = await sut.execute({ userId: createdUser.id })

    expect(user.id).toEqual(expect.any(String))
    expect(user.name).toEqual('John Doe')
  })

  it('should not be able to get user profile with wrong id', async () => {
    await expect(
      sut.execute({ userId: 'wrong-user-id' }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
