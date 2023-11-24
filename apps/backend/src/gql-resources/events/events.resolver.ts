import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateEventInput, GetListByRequesterIdInput } from './dto/create-event.input';
import { LikedEventInput } from './dto/liked-event.input';
import { SaveEventInput } from './dto/save-event.input';
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

  @Query(() => [EventEntity])
  getListOfEventsByRequesterId(@Args('getListOfEventsByRequesterIdInput') getListOfEventsByRequesterId: GetListByRequesterIdInput){
    return this.eventsService.getListByRequesterId(getListOfEventsByRequesterId)
  }

  @Mutation(() => EventEntity)
  createEvent(@Args('createEventInput') createEventInput: CreateEventInput){
    return this.eventsService.create(createEventInput);
  }

  @Mutation(() => EventEntity)
  addLike(@Args('likedEventInput') likedEventInput: LikedEventInput){
    return this.eventsService.addLike(likedEventInput);
  }

  @Mutation(() => EventEntity)
  removeLike(@Args('likedEventInput') likedEventInput: LikedEventInput){
    return this.eventsService.removeLike(likedEventInput);
  }

  @Mutation(() => EventEntity)
  saveEventByUser(@Args('saveEventInput') saveEventInput: SaveEventInput){
    return this.eventsService.saveEventByUser(saveEventInput);
  }

  @Mutation(() => EventEntity)
  unSaveEventByUser(@Args('saveEventInput') saveEventInput: SaveEventInput){
    return this.eventsService.unSaveEventByUser(saveEventInput);
  }

}
