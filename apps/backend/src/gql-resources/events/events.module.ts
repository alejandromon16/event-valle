import { Module } from '@nestjs/common';
import { WhatsappService } from '../../common/services/whatsapp/ultrasmg.service';
import { EventsResolver } from './events.resolver';
import { EventsService } from './events.service';

@Module({
  providers: [
    EventsResolver,
    EventsService,
    WhatsappService,
  ],
  exports: [EventsService]
})
export class EventsModule {}

