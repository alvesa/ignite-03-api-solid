import request from 'supertest'
import { test, it, expect, beforeAll, afterAll } from 'vitest'
import { app } from '@/app'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'
import { prisma } from '@/lib/prisma'

test('Validate Checkin (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to validate a checkin', async () => {
    const { token } = await createAndAuthenticateUser(app)

    const user = await prisma.user.findFirst()

    const gym = await prisma.gym.create({
      data: {
        title: 'Js Gym',
        latitude: -27.2092052,
        longitude: -49.6401091,
      },
    })

    let checkIn = await prisma.checkin.create({
      data: {
        gym_id: gym.id,
        user_id: user.id,
      },
    })

    const response = await await request(app.server)
      .patch(`/chekins/${checkIn.id}/validate`)
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toEqual(204)

    checkIn = await prisma.checkin.findUniqueOrThrow({
      where: {
        id: checkIn.id,
      },
    })

    expect(checkIn.validated_at).toEqual(expect.any(Date))
  })
})
