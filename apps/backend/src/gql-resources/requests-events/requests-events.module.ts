import { Module } from '@nestjs/common';
import { RequestsEventsService } from './requests-events.service';
import { RequestsEventsResolver } from './requests-events.resolver';
import { EmailService } from '../../common/services';
import { WhatsappService } from '../../common/services/whatsapp/ultrasmg.service';

@Module({
  providers: [
    RequestsEventsService,
    RequestsEventsResolver,
    WhatsappService,
    { provide: EmailService, useValue: new EmailService() }
  ],
  exports: [RequestsEventsService]
})
export class RequestsEventsModule {}
