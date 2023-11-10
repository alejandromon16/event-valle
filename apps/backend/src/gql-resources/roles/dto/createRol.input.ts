import { Field, InputType } from '@nestjs/graphql'
import { Prisma, RoleType } from '@prisma/client'
import { IsNotEmpty, IsString } from 'class-validator'


@InputType()
export class CreateRoleInput implements Prisma.RoleUncheckedCreateInput {
  id?: string | undefined

  @IsString()
  @IsNotEmpty()
  @Field(() => RoleType)
  name?: RoleType;

  @IsString()
  @IsNotEmpty()
  @Field(() => String)
  description: string;

  users?:Prisma.UserUncheckedCreateNestedManyWithoutRolesInput | undefined;
}

