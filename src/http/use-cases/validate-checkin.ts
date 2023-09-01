import { Checkin } from '@prisma/client'
import { CheckInsRepository } from '../repositories/check-ins-repository'
import { ResourceNotFoundError } from './errors/resource-not-found'

interface ValidateCheckInUseCaseRequest {
  checkInId: string
}

interface ValidateCheckInUseCaseResponse {
  checkIn: Checkin
}

export class ValidateCheckInUseCase {
  constructor(private checkInsRepository: CheckInsRepository) {}

  async execute({
    checkInId,
  }: ValidateCheckInUseCaseRequest): Promise<ValidateCheckInUseCaseResponse> {
    const checkIn = await this.checkInsRepository.findById(checkInId)

    if (!checkIn) {
      throw new ResourceNotFoundError()
    }

    checkIn.validated_at = new Date()

    this.checkInsRepository.save(checkIn)

    return { checkIn }
  }
}
