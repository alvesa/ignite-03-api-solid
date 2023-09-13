import request from 'supertest'
import { test, it, expect, beforeAll, afterAll } from 'vitest'
import { app } from '@/app'

test('Register (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to register', async () => {
    const response = await request(app.server).post('/users').send({
      name: 'John Doe',
      email: 'email@example.com',
      password: '123456',
    })

    expect(response.statusCode).toEqual(201)
  })
})
