import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class GetRequestsEventsByUserIdInput{
    @Field(() => String)
    userId?: string;
}
