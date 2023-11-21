import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class LikedEventInput {

  @Field(() => String)
  userId: string;

  @Field(() => String)
  eventId: string;

}
