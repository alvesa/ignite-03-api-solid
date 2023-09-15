import request from 'supertest'
import { test, it, expect, beforeAll, afterAll } from 'vitest'
import { app } from '@/app'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'
import { prisma } from '@/lib/prisma'

test('Create Checkin (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able create a checkin', async () => {
    const { token } = await createAndAuthenticateUser(app)

    const gym = await prisma.gym.create({
      data: {
        title: 'Js Gym',
        latitude: -27.2092052,
        longitude: -49.6401091,
      },
    })

    const response = await await request(app.server)
      .post(`/gyms/${gym.id}/checkins`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Js Gym',
        description: 'Some description',
        phone: '119999999999',
        latitude: -27.2092052,
        longitude: -49.6401091,
      })

    expect(response.statusCode).toEqual(201)
  })
})
