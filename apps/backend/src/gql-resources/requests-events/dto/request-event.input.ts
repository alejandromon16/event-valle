import { Field, InputType } from "@nestjs/graphql";
import { Prisma } from "@prisma/client";
import { IsOptional } from "class-validator";


@InputType()
export class CreateRequestEventInput implements Prisma.RequestEventCreateWithoutApprovedByInput {
    id?: string | undefined

    @Field(() => String)
    title?: string;

    @Field(() => String)
    subtitle: string;

    @Field(() => String)
    description: string;

    @Field(() => String)
    startDate: Date | string;

    @Field(() => String)
    requestedById: string;

    @IsOptional()
    @Field(() => String,{nullable: true})
    endDate?: string | Date | undefined;

    @Field(() => String)
    locationName: string;

    @Field(() => String)
    address: string;

    @IsOptional()
    @Field(() => String, { nullable: true })
    createdAt?: string | Date | undefined
    updatedAt?: string | Date | undefined

    longitud?: number;
    latitud?: number;
    locationDetail?: string;

    requestedBy: Prisma.UserCreateNestedOneWithoutEventsRequestedInput | undefined;
}

@InputType()
export class GetRequestEventByIdInput{
    @Field(() => String)
    requestEventId?: string;
}
