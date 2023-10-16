import { User } from '@prisma/client'
import { IsString } from 'class-validator'

export class RequestPasswordResetEvent {
  requestedByUser!: User

  @IsString()
  token!: string

  constructor(data: RequestPasswordResetEvent) {
    Object.assign(this, data)
  }
}
