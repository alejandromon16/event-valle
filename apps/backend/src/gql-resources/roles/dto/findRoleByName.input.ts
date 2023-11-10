import { Field, InputType } from "@nestjs/graphql";
import { RoleType } from "@prisma/client";

@InputType()
export class FindRoleByNameInput {
  @Field(() => RoleType)
  name: RoleType;
}

