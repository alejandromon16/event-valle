import { Field, ObjectType, registerEnumType } from "@nestjs/graphql";
import { RoleType, User } from "@prisma/client";
import { UserEntity } from "../../users/entities/user.entity";

@ObjectType()
export class RoleEntity {
  @Field(() => String)
  id: string;

  @Field(() => RoleType)
  name: RoleType;

  @Field(() => String)
  description: string;

  @Field(() => [UserEntity],{ defaultValue: []})
  users: User[];
}

registerEnumType(RoleType, {
  name: 'RoleType',
  description: 'Possible roles for a user',
});
