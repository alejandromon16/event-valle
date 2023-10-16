import { Injectable } from '@nestjs/common'
import { PassportSerializer } from '@nestjs/passport'
import { User } from '@prisma/client'
import { UsersService } from '../../users/users.service'

interface SessionUserPayload {
  userId: string
}

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(private readonly userService: UsersService) {
    super()
  }

  serializeUser(user: User, done: (err: Error | null, user: SessionUserPayload) => void) {
    done(null, { userId: user.id })
  }

  async deserializeUser(
    payload: SessionUserPayload,
    done: (err: Error | null, user: User) => void
  ) {
    const user = await this.userService.retrieve(payload.userId)

    done(null, user)
  }
}
