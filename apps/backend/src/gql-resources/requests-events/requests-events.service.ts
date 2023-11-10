import { ApiError } from '@eventvalle/api/shared/exceptions';
import { HttpStatus, Injectable } from '@nestjs/common';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { PrismaService } from '../../common/services/database/prisma.service';
import { WhatsappService } from '../../common/services/whatsapp/ultrasmg.service';
import { CreateRequestEventInput } from './dto/request-event.input';
import { RequestEventEntity } from './entities/request-event.entity';
import { RequestEventCreatedEvent } from './events/request-event-created';

@Injectable()
export class RequestsEventsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly eventEmitter: EventEmitter2,
    private readonly whatsappService: WhatsappService
  ){}
  async create(createRequestEventInput: CreateRequestEventInput): Promise<RequestEventEntity>{

    const { requestedById, ...requestEventData } = createRequestEventInput;

    const user = this.prisma.user.findUnique({
      where: {
        id: requestedById
      }
    })

    if(!user){
      throw new ApiError(`User doesnt exist`, {
        statusCode: HttpStatus.BAD_REQUEST,
        type: "api_error",
        explanation:
          'the user id that request is not an user in the system',
      })
    }

    const requestEvent = this.prisma.requestEvent.create({
      data: {
        ...requestEventData,
        requestedBy: {
          connect: {
            id: requestedById
          }
        }
      },
      include: { requestedBy: true}
    })

    this.eventEmitter.emit(
      'requestEvent.created',
      new RequestEventCreatedEvent(await user, (await requestEvent).title)
    )

    return requestEvent
  }

  async getList(): Promise<RequestEventEntity[]> {
    const requestsEvents = this.prisma.requestEvent.findMany({
      include: { requestedBy: true }
    });
    return requestsEvents;
  }

  @OnEvent('requestEvent.created')
  async NotifyApprovers(payload: RequestEventCreatedEvent){
    const approvers = await this.prisma.user.findMany({
      where: {
        roles: {
          some: {
            name: "REQUEST_APPROVER"
          }
        }
      }
    })

    for(const approver of approvers){
      this.whatsappService.sendMessage({
        to: `${approver.phone_number}`,
        body: `
          ${payload.user.name} ha enviado una solicitud para un Evento con titulo: ${payload.titleEvent}
        `
      })
    }
  }

}
