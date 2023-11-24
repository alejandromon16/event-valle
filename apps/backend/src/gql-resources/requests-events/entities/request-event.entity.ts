import { Field, Float, ObjectType, registerEnumType } from "@nestjs/graphql";
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

  @Field(() => String)
  subtitle: string;

  @Field(() => String)
  description: string;


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

  @IsOptional()
  @Field(() => String, {nullable: true})
  updatedAt!: Date

  @Field(() => RequestEventStatus)
  status!: RequestEventStatus

  @Field(() => UserEntity, {nullable: true})
  requestedBy: User | null

  @Field(() => UserEntity, {nullable: true})
  approvedBy: User | null
}


registerEnumType(RequestEventStatus, {
  name: 'RequestEventStatus',
  description: 'Possible status for request event',
});
