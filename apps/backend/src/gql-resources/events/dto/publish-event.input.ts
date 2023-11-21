import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class PublishEventInput {

  @Field(() => String)
  userId: string;

  @Field(() => String)
  eventId: string;

}
