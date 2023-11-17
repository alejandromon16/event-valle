import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { PrismaService } from '../../common/services/database/prisma.service';
import { WhatsappService } from '../../common/services/whatsapp/ultrasmg.service';
import { CreateEventInput } from './dto/create-event.input';
import { EventEntity } from './entities/event.entity';

@Injectable()
export class EventsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly eventEmitter: EventEmitter2,
    private readonly whatsappService: WhatsappService
  ){}

  async create(createEventInput: CreateEventInput): Promise<EventEntity> {
    const { requestEventId, ...eventData } = createEventInput;
    const event = await this.prisma.event.create({
      data: {
        ...eventData,
        requestEvent: {
          connect: {
            id: requestEventId
          }
        }
      },
    })

    return event;
  }

  async list(): Promise<EventEntity[]> {
    const events = await this.prisma.event.findMany();

    return events;
  }

  async listOfThisWeek(): Promise<EventEntity[]> {
    const today = new Date();
    const nextWeek = new Date();
    nextWeek.setDate(today.getDate() + 7);

    const events = await this.prisma.event.findMany({
      where: {
        startDate: {
          gte: today,
          lt: nextWeek,
        },
      }
    });

    return events;
  }

  async listOfThisMonth(): Promise<EventEntity[]> {
    const today = new Date();
    const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

    const events = await this.prisma.event.findMany({
      where: {
        startDate: {
          gte: today,
          lt: endOfMonth,
        },
        status: 'PUBLISH'
      }
    });

    return events;
  }

}
