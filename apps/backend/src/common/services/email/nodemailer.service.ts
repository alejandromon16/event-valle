import { Injectable, Logger } from "@nestjs/common";
import { EmailBody, IEmailResponse, IEmailService } from "./email.service";
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService implements IEmailService {
  private logger = new Logger(EmailService.name)
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'Gmail', // e.g., 'Gmail', 'Outlook', etc.
      auth: {
        user: 'your_email@gmail.com',
        pass: 'your_password',
      },
    });
  }

  async sendEmail<Response = IEmailResponse>(
    email: string,
    subject: string,
    body: EmailBody
  ): Promise<Response> {
    const mailOptions: nodemailer.SendMailOptions = {
      from: 'your_email@gmail.com',
      to: email,
      subject: subject,
      text: body.text || '',
      html: body.html || '',
    };

    try {
      const response = await this.transporter.sendMail(mailOptions);
      return response
    } catch (error) {
      console.log(error)
      this.logger.error(`Failed to send email to ${email.toString()}`)
    }
  }

  sendBulkEmail(emails: string[], subject: string, body: EmailBody) {
    const mailOptions: nodemailer.SendMailOptions = {
      from: 'your_email@gmail.com',
      to: emails.join(', '),
      subject: subject,
      text: body.text || '',
      html: body.html || '',
    };

    return new Promise((resolve, reject) => {
      this.transporter.sendMail(mailOptions)
    });
  }
}
