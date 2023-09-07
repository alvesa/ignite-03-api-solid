export class LateCheckInValidateError extends Error {
  constructor() {
    super('The checkin can only be validated 20 minutes of its own creation')
  }
}
