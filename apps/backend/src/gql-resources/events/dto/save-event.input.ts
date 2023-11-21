import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class SaveEventInput {

  @Field(() => String)
  userId: string;

  @Field(() => String)
  eventId: string;

}
