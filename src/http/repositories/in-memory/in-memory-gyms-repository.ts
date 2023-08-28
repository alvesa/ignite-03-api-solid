import { Gym } from '@prisma/client'
import { GymsRepository } from '../gyms-repository'

export class InMemoryGymsRepository implements GymsRepository {
  public gyms: Gym[] = []

  async findById(id: string) {
    const gyms = this.gyms.find((gym) => gym.id === id)

    if (!gyms) {
      return null
    }

    return gyms
  }
}
