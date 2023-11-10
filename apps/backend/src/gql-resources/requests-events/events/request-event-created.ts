import { User } from "@prisma/client";

export class RequestEventCreatedEvent {
  constructor(public readonly user: User, public readonly titleEvent: string){}
}
