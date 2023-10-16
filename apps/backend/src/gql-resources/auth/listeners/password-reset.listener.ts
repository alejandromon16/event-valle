import { Injectable, Logger } from '@nestjs/common'
import { EmailService } from '../../../common/services'
import { OnEvent } from '@nestjs/event-emitter'
import { AUTH_EVENTS } from '../constants/event.constants'
import { RequestPasswordResetEvent } from '../events/request-password-reset.event'
import { renderEmailTemplate } from '@eventvalle/api/shared/utils-email-templates'

@Injectable()
export class PasswordResetListener {
  private readonly logger = new Logger(PasswordResetListener.name)

  constructor(private readonly emailService: EmailService) {}

  @OnEvent(AUTH_EVENTS.requestPasswordReset)
  async sendPasswordResetEmail(payload: RequestPasswordResetEvent) {
    const baseUrl =
      process.env.NODE_ENV === 'development'
        ? 'http://localhost:4200'
        : 'https://office.travell.app'

    const html = await renderEmailTemplate('resetPassword', {
      requestedByEmail: payload.requestedByUser.email,
      // TODO: Replace with actual email
      resetPasswordUrl: `${baseUrl}/reset?token=${payload.token}&user_id=${payload.requestedByUser.id}`,
    })

    await this.emailService.sendEmail(payload.requestedByUser.email, 'Password reset request', {
      html: html,
    })
  }
}
