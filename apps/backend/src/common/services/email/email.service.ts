import { Injectable } from '@nestjs/common'
import { SesEmailService } from './ses-email.service'

export interface IEmailResponse {
  status: 'success' | 'failed' | 'fatal'
  message: string
}

export interface EmailBody {
  text?: string
  html?: string
}

export abstract class IEmailService {
  abstract sendEmail(email: string, subject: string, body: EmailBody): any

  abstract sendBulkEmail(emails: string[], subject: string, body: EmailBody): any
}

@Injectable()
export class EmailService implements IEmailService {
  private readonly emailProvider!: IEmailService

  constructor(emailProvider?: IEmailService) {
    this.emailProvider = emailProvider || new SesEmailService()
  }

  sendEmail<Response = IEmailResponse>(
    email: string,
    subject: string,
    body: EmailBody
  ): Promise<Response> {
    const response = this.emailProvider.sendEmail(email, subject, body)
    return response
  }

  sendBulkEmail(emails: string[], subject: string, body: EmailBody) {
    return this.emailProvider.sendBulkEmail(emails, subject, body)
  }
}
