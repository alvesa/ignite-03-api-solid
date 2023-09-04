import { Checkin, Prisma, User } from '@prisma/client'
import { CheckInsRepository } from '../check-ins-repository'
import { prisma } from '@/lib/prisma'
import dayjs from 'dayjs'

export class PrismaCheckinsRepository implements CheckInsRepository {
  async create(data: Prisma.CheckinUncheckedCreateInput): Promise<Checkin> {
    const checkIn = await prisma.checkin.create({})

    return checkIn
  }

  async findManyByUserId(id: string, page: number): Promise<Checkin[]> {
    const checkIns = await prisma.checkin.findMany({
      where: { id },
      take: 20,
      skip: (page - 1) * 20,
    })

    return checkIns
  }

  async findByUserIdOnDate(
    userId: string,
    date: Date,
  ): Promise<Checkin | null> {
    const startOfTheDay = dayjs(date).startOf('date')
    const endOfTheDay = dayjs(date).endOf('date')

    const checkIn = await prisma.checkin.findFirst({
      where: {
        user_id: userId,
        created_at: {
          gte: startOfTheDay.toDate(),
          lte: endOfTheDay.toDate(),
        },
      },
    })

    return checkIn
  }

  async countByUserId(id: string): Promise<number> {
    const count = await prisma.checkin.count({ where: { id } })

    return count
  }

  async findById(id: string): Promise<Checkin | null> {
    const checkIn = await prisma.checkin.findUnique({ where: { id } })

    return checkIn
  }

  async save(data: Checkin): Promise<Checkin> {
    const checkin = await prisma.checkin.update({
      where: { id: data.id },
      data,
    })

    return checkin
  }
}
