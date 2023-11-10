import { Field, ObjectType, registerEnumType } from "@nestjs/graphql";
import { RequestEventStatus, User } from "@prisma/client";
import { IsOptional } from "class-validator";
import { UserEntity } from "../../users/entities/user.entity";

@ObjectType()
export class RequestEventEntity {

  @Field(() => String)
  id: string | undefined

  @IsOptional()
  @Field(() => String, {nullable: true})
  createdAt!: Date

  @Field(() => String)
  title: string

  @IsOptional()
  @Field(() => String, {nullable: true})
  updatedAt!: Date

  @Field(() => RequestEventStatus)
  status!: RequestEventStatus

  @Field(() => UserEntity, {nullable: true})
  requestedBy: User | undefined
}


registerEnumType(RequestEventStatus, {
  name: 'RequestEventStatus',
  description: 'Possible status for request event',
});
