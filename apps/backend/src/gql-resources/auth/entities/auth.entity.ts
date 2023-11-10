import { Field, ObjectType } from "@nestjs/graphql";
import { Role } from "@prisma/client";
import { RoleEntity } from "../../roles/entities/rol.entity";

@ObjectType()
export class LogoutEntity {
  @Field(() => String)
  status!: string;
}

@ObjectType()
export class MeEntity {
  @Field(() => String)
  userId!: string;

  @Field(() => [RoleEntity])
  roles: Role[];
}
