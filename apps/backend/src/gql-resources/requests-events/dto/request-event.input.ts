import { Field, InputType } from "@nestjs/graphql";
import { Prisma } from "@prisma/client";
import { IsOptional } from "class-validator";


@InputType()
export class CreateRequestEventInput implements Prisma.RequestEventCreateWithoutApprovedByInput {
    id?: string | undefined

    @Field(() => String)
    title?: string;

    @Field(() => String)
    requestedById: string;

    @IsOptional()
    @Field(() => String, { nullable: true })
    createdAt?: string | Date | undefined
    updatedAt?: string | Date | undefined

    requestedBy: Prisma.UserCreateNestedOneWithoutEventsRequestedInput | undefined;
  }
