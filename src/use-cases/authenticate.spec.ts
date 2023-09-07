import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryUserRepository } from '../repositories/in-memory/in-memory-users-repository'
import { AuthenticateUseCase } from './authenticate'
import bcryptjs from 'bcryptjs'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

let usersRepository: InMemoryUserRepository
let sut: AuthenticateUseCase

beforeEach(() => {
  usersRepository = new InMemoryUserRepository()
  sut = new AuthenticateUseCase(usersRepository)
})

describe('Authenticate Use Case', () => {
  it('should be able to authenticate', async () => {
    await usersRepository.create({
      name: 'John Doe',
      email: 'email123@email.com',
      password_hash: await bcryptjs.hash('123456789', 6),
    })

    const { user } = await sut.execute({
      email: 'email123@email.com',
      password: '123456789',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should not be able to authenticate with wrong email', async () => {
    await expect(
      async () =>
        await sut.execute({
          email: 'email123@email.com',
          password: '123456789',
        }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able to authenticate with wrong password', async () => {
    await usersRepository.create({
      name: 'John Doe',
      email: 'email123@email.com',
      password_hash: await bcryptjs.hash('123456789', 6),
    })

    await expect(
      async () =>
        await sut.execute({
          email: 'email123@email.com',
          password: '123456',
        }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
