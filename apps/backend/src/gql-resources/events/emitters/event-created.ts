import { User, Event, RequestEvent } from "@prisma/client";

export class EventCreatedEvent {
  constructor(
    public readonly requestBy: User,
    public readonly approveBy: User,
    public readonly requestedEvent: RequestEvent,
    public readonly event: Event
  ){}
}
