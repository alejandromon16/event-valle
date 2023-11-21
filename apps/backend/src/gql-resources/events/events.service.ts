import { Injectable } from '@nestjs/common';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { PrismaService } from '../../common/services/database/prisma.service';
import { WhatsappService } from '../../common/services/whatsapp/ultrasmg.service';
import { CreateEventInput } from './dto/create-event.input';
import { LikedEventInput } from './dto/liked-event.input';
import { PublishEventInput } from './dto/publish-event.input';
import { SaveEventInput } from './dto/save-event.input';
import { EventCreatedEvent } from './emitters/event-created';
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

    const requestedEvent = await this.prisma.requestEvent.findUnique({
      where: {
        id: requestEventId
      },
      include: {
        requestedBy: true,
        approvedBy: true,
      }
    })



    this.eventEmitter.emit(
      'event.created',
      new EventCreatedEvent(
        requestedEvent.requestedBy,
        requestedEvent.approvedBy,
        requestedEvent,
        event
      )
    )

    return event;
  }

  async publish(publishEventInput: PublishEventInput): Promise<EventEntity> {
    const event = await this.prisma.event.update({
      where:{
        id: publishEventInput.eventId,
      },
      data: {
        status: 'PUBLISH',
        publishedBy: {
          connect:{
            id: publishEventInput.userId
          }
        }
      }
    })

    return event
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

  async addLike(likedEventInput: LikedEventInput): Promise<EventEntity> {
    const { userId, eventId } = likedEventInput;

    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    const event = await this.prisma.event.findUnique({
      where: { id: eventId },
    });

    if (!user || !event) {
      throw new Error('User or Event not found');
    }

    const updatedEvent = await this.prisma.event.update({
      where: { id: eventId },
      data: {
        likedBy: {
          connect: { id: userId },
        },
      },
    });

    return updatedEvent;
  }

  async removeLike(likedEventInput: LikedEventInput): Promise<EventEntity> {
    const { userId, eventId } = likedEventInput;

    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    const event = await this.prisma.event.findUnique({
      where: { id: eventId },
    });

    if (!user || !event) {
      throw new Error('User or Event not found');
    }

    const updatedEvent = await this.prisma.event.update({
      where: { id: eventId },
      data: {
        likedBy: {
          disconnect: { id: userId },
        },
      },
    });

    return updatedEvent;
  }

  async saveEventByUser(saveEventInput: SaveEventInput): Promise<EventEntity> {
    const { userId, eventId } = saveEventInput;

    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    const event = await this.prisma.event.findUnique({
      where: { id: eventId },
    });

    if (!user || !event) {
      throw new Error('User or Event not found');
    }

    const updatedEvent = await this.prisma.event.update({
      where: { id: eventId },
      data: {
        savedBy: {
          connect: { id: userId },
        },
      },
    });

    return updatedEvent;
  }

  async unSaveEventByUser(saveEventInput: SaveEventInput): Promise<EventEntity> {
    const { userId, eventId } = saveEventInput;

    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    const event = await this.prisma.event.findUnique({
      where: { id: eventId },
    });

    if (!user || !event) {
      throw new Error('User or Event not found');
    }

    const updatedEvent = await this.prisma.event.update({
      where: { id: eventId },
      data: {
        savedBy: {
          disconnect: { id: userId },
        },
      },
    });

    return updatedEvent;
  }

  @OnEvent('event.created')
  async NotifyApproverAndRequesterOfEvent(payload: EventCreatedEvent){
    this.whatsappService.sendMessage({
      to: `${payload.requestBy.phone_number}`,
      body: `
        El equipo de Marketing a finalizado de trabajar en tu evento (
          ${payload.event.title}
        ) que fue solicitado en la fecha ${payload.requestedEvent.createdAt},
        Revisa su trabajo.
      `
    })

    this.whatsappService.sendMessage({
      to: `${payload.requestBy.phone_number}`,
      body: `
        El equipo de Marketing a finalizado de trabajar en el evento:
        ${payload.event.title}.
        ${payload.event.startDate}.

        Revisa su trabajo y si lo apruebas publicalo!.
      `
    })


  }
}
