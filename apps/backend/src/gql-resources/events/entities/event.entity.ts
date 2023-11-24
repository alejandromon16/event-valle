import { Field, Float, ObjectType, registerEnumType } from "@nestjs/graphql";
import { EventStatus, RequestEvent } from "@prisma/client";
import { RequestEventEntity } from "../../requests-events/entities/request-event.entity";
import { UserEntity } from "../../users/entities/user.entity";

@ObjectType()
export class EventEntity {

  @Field(() => String)
  id: string;

  @Field(() => String)
  createdAt: Date;

  @Field(() => String)
  title: string;

  @Field(() => String)
  updatedAt: Date;

  @Field(() => EventStatus)
  status: EventStatus;

  @Field(() => String)
  subtitle: string;

  @Field(() => String)
  description: string;

  @Field(() => String)
  principalImage: string;

  @Field(() => [String])
  images: string[];

  @Field(() => [String])
  tags: string[];

  @Field(() => Date)
  startDate: Date;

  @Field(() => Date, { nullable: true })
  endDate: Date | null;

  @Field(() => String)
  locationName: string;

  @Field(() => String, { nullable: true })
  locationDetail: string | null;

  @Field(() => String)
  address: string;

  @Field(() => Float, { nullable: true })
  longitud: number | null;

  @Field(() => Float, { nullable: true })
  latitud: number | null;

  @Field(() => RequestEventEntity, { nullable: true})
  requestEvent: RequestEvent | null

}

registerEnumType(EventStatus, {
  name: 'EventStatus',
  description: 'Possible status for events',
});

