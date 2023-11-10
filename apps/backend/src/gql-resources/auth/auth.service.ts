/* eslint-disable @typescript-eslint/ban-ts-comment */
import { ApiError } from '@eventvalle/api/shared/exceptions'
import { HttpStatus, Injectable } from '@nestjs/common'
import { compare } from 'bcrypt'
import { randomBytes } from 'crypto'
import { DateTime } from 'luxon'
import { PrismaService } from '../../common/services/database/prisma.service'
import { UsersService } from '../users/users.service'
import { LoginInput } from './dto/login.input'
import { RequestPasswordResetInput } from './dto/request-password-reset.input'
import { ResetPasswordInput } from './dto/reset-password.input'
import { ValidatePasswordResetTokenInput } from './dto/validate-password-reset-token.input'
import { EventEmitter2 } from '@nestjs/event-emitter'
import { RequestPasswordResetEvent } from './events/request-password-reset.event'
import { AUTH_EVENTS } from './constants/event.constants'
import { EmailService } from '../../common/services'
import { UserEntity } from '../users/entities/user.entity'
import { Response } from 'express'

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly emailService: EmailService,
    private readonly userService: UsersService,
    private readonly eventEmitter: EventEmitter2
  ) {}

  async login(loginInput: LoginInput) {
    const user = await this.validateUser(loginInput.email, loginInput.password);
    return user
  }

  async requestPasswordReset(resetPasswordInput: RequestPasswordResetInput) {
    const PASSWORD_RESET_TOKEN_LENGTH = 40

    const user = await this.prisma.user.findUnique({
      where: { email: resetPasswordInput.email },
      include: { PasswordResetToken: true },
    })

    this.eventEmitter.emit('')

    if (!user)
      throw new ApiError('User with that email does not exist.', {
        statusCode: HttpStatus.UNAUTHORIZED,
        type: 'authenticate_error',
        explanation:
          'Please check the spelling, and formatting of the email to ensure it is correct.',
      })

    const generatedToken = randomBytes(PASSWORD_RESET_TOKEN_LENGTH).toString('hex')

    const passwordResetToken = await this.prisma.passwordResetToken.create({
      data: {
        userId: user.id,
        token: generatedToken,
        expiration_date: DateTime.utc().plus({ hour: 1 }).toJSDate(),
      },
      include: { user: true },
    })

    await this.prisma.passwordResetToken.updateMany({
      where: { id: { not: passwordResetToken.id } },
      data: { deactivated: true },
    })

    this.eventEmitter.emit(
      AUTH_EVENTS.requestPasswordReset,
      new RequestPasswordResetEvent({
        requestedByUser: passwordResetToken.user,
        token: generatedToken,
      })
    )

    return passwordResetToken.user
  }

  async validatePasswordResetToken(
    validatePasswordResetTokenInput: ValidatePasswordResetTokenInput
  ) {
    const token = await this.prisma.passwordResetToken.findFirst({
      where: {
        token: validatePasswordResetTokenInput.token,
        userId: validatePasswordResetTokenInput.user_id,
        deactivated: false,
      },
      orderBy: { expiration_date: 'desc' },
    })

    if (!token)
      throw new ApiError(`Password reset token doesn't exist`, {
        statusCode: HttpStatus.UNAUTHORIZED,
        type: 'authenticate_error',
        explanation:
          'The reset token no longer exist or has expired. Try resending the password reset request.',
      })

    if (DateTime.fromJSDate(token.expiration_date).diffNow(['seconds']).seconds < 0)
      throw new ApiError(`Password reset token has expired`, {
        statusCode: HttpStatus.UNAUTHORIZED,
        type: 'authenticate_error',
        explanation: 'The reset token has expired. Try resending the password reset request.',
      })

    return token
  }

  async validateUser(email: string, password: string): Promise<UserEntity | null> {
    const user = await this.prisma.user.findUnique({
      where: { email: email?.toLowerCase() },
      include: { roles: true}
    })

    if (!user)
      throw new ApiError(`User ${email} not found`, {
        statusCode: HttpStatus.UNAUTHORIZED,
        type: 'authenticate_error',
      })

    const matchingPassword = await compare(password, user.password)

    if (!matchingPassword)
      throw new ApiError(`Invalid password please try again`, {
        statusCode: HttpStatus.UNAUTHORIZED,
        type: 'authenticate_error',
      })

    return user;
  }

  async resetPasswordWithToken(resetPasswordInput: ResetPasswordInput) {
    const validation = await this.validatePasswordResetToken({
      token: resetPasswordInput.token,
      user_id: resetPasswordInput.userId,
    })

    if (!validation)
      throw new ApiError(`Password reset token doesn't exist`, {
        statusCode: HttpStatus.UNAUTHORIZED,
        type: 'authenticate_error',
        explanation:
          'The reset token no longer exist or has expired. Try resending the password reset request.',
      })

    const user = await this.userService.update(resetPasswordInput.userId, {
      id: resetPasswordInput.userId,
      password: resetPasswordInput.newPassword,
    })

    await this.prisma.passwordResetToken.update({
      where: { id: validation.id },
      data: { deactivated: true },
    })

    return user
  }


  logout(response: Response) {
    response.cookie('Authentication', '', {
      httpOnly: true,
      expires: new Date(),
    });
  }
}
