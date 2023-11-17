import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateEventInput } from './dto/create-event.input';
import { EventEntity } from './entities/event.entity';
import { EventsService } from './events.service';

@Resolver()
export class EventsResolver {
  constructor(
    private readonly eventsService: EventsService,
  ){}

  @Query(() => [EventEntity])
  getListOfEvents(){
    return this.eventsService.list();
  }

  @Query(() => [EventEntity])
  getListOfEventsForThisWeek(){
    return this.eventsService.listOfThisWeek();
  }

  @Query(() => [EventEntity])
  getListOfEventsForThisMonth(){
    return this.eventsService.listOfThisMonth();
  }

  @Mutation(() => EventEntity)
  createEvent(@Args('createEventInput') createEventInput: CreateEventInput){
    return this.eventsService.create(createEventInput);
  }
}
