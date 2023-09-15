import request from 'supertest'
import { test, it, expect, beforeAll, afterAll } from 'vitest'
import { app } from '@/app'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'

test('Create Gyms (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able create a gym', async () => {
    const { token } = await createAndAuthenticateUser(app)

    const profileResponse = await await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Js Gym',
        description: 'Some description',
        phone: '119999999999',
        latitute: -27.2092052,
        longitude: -49.6401091,
      })

    expect(profileResponse.statusCode).toEqual(201)
  })
})
