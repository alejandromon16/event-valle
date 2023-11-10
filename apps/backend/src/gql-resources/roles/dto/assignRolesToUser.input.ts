import { Field, InputType } from "@nestjs/graphql";
import { RoleType } from "@prisma/client";

@InputType()
export class AssignRolesToUserInput {
  @Field(() => String)
  userId: string;

  @Field(() => [RoleType])
  roles: RoleType[]
}

