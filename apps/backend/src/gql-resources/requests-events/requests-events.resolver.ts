import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateRequestEventInput } from './dto/request-event.input';
import { RequestEventEntity } from './entities/request-event.entity';
import { RequestsEventsService } from './requests-events.service';

@Resolver()
export class RequestsEventsResolver {
  constructor(
    private readonly requestEventService: RequestsEventsService,
  ){}

  @Mutation(() => RequestEventEntity)
  createRequestEvent(@Args('createRequestEventInput') createRequestEventInput: CreateRequestEventInput){
    return this.requestEventService.create(createRequestEventInput)
  }

  @Query(() => [RequestEventEntity])
  getListOfRequestsEvents(){
    return this.requestEventService.getList();
  }
}
