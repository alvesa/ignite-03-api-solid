import { Checkin } from '@prisma/client'
import { CheckInsRepository } from '../repositories/check-ins-repository'

interface FetchUserCheckInsUseCaseRequest {
  userId: string
  page: number
}

interface FetchUserCheckInsUseCaseResponse {
  checkIns: Checkin[]
}

export class FetchUserCheckInsHistoryUseCase {
  constructor(private checkInsRepository: CheckInsRepository) {}

  async execute({
    userId,
    page,
  }: FetchUserCheckInsUseCaseRequest): Promise<FetchUserCheckInsUseCaseResponse> {
    const checkIns = await this.checkInsRepository.findManyByUserId(
      userId,
      page,
    )

    return { checkIns }
  }
}
