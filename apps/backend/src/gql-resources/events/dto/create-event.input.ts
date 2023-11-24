import { Field, Float, InputType } from "@nestjs/graphql";
import { EventStatus, Prisma } from "@prisma/client";
import { IsOptional } from "class-validator";


@InputType()
export class CreateEventInput implements Prisma.EventUncheckedCreateWithoutPublishedByInput {
  id?: string | undefined;

  @IsOptional()
  @Field(() => String, { nullable: true })
  createdAt?: string | Date;
  updatedAt?: string | Date;

  @Field(() => String)
  address: string;

  longitud?: number;
  latitud?: number;
  status?: EventStatus;
  locationDetail?: string;

  @Field(() => String)
  title: string;

  @Field(() => String)
  subtitle: string;

  @Field(() => String)
  description: string;

  @Field(() => String)
  principalImage: string;

  @Field(() => String)
  startDate: Date | string;

  @IsOptional()
  @Field(() => [String])
  images?: Prisma.EventCreateimagesInput | Prisma.Enumerable<string>;

  @IsOptional()
  @Field(() => [String])
  tags?: Prisma.Enumerable<string> | Prisma.EventCreatetagsInput;

  @IsOptional()
  @Field(() => String,{nullable: true})
  endDate?: string | Date | undefined;

  @Field(() => String)
  locationName: string;

  @Field(() => String)
  requestEventId:string;
}

@InputType()
export class GetListByRequesterIdInput {
  @Field(() => String)
  requesterId: string;
}
