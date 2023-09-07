import { Checkin, Prisma } from '@prisma/client'

export interface CheckInsRepository {
  create(data: Prisma.CheckinUncheckedCreateInput): Promise<Checkin>
  findManyByUserId(userId: string, page: number): Promise<Checkin[]>
  findByUserIdOnDate(userId: string, date: Date): Promise<Checkin | null>
  countByUserId(userId: string): Promise<number>
  findById(id: string): Promise<Checkin | null>
  save(checkIn: Checkin): Promise<Checkin>
}
