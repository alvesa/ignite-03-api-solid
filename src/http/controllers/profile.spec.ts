import request from 'supertest'
import { test, it, expect, beforeAll, afterAll } from 'vitest'
import { app } from '@/app'

test('Profile (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to register', async () => {
    await request(app.server).post('/users').send({
      name: 'John Doe',
      email: 'email@example.com',
      password: '123456',
    })

    const authResponse = await request(app.server).post('/session').send({
      email: 'email@example.com',
      password: '123456',
    })

    const { token } = authResponse.body

    const profileResponse = await await request(app.server)
      .get('/me')
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(profileResponse.statusCode).toEqual(200)
    expect(profileResponse.body.user).toEqual(
      expect.objectContaining({ email: 'email@example.com' }),
    )
  })
})
