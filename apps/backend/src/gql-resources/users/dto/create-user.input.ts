import { Field, InputType, Int } from '@nestjs/graphql'
import { Prisma } from '@prisma/client'
import { IsEmail, IsNumber, IsOptional, IsString } from 'class-validator'
import { TransformLowercase } from '../../../common/decorators/transformers/transform-lowercase.decorator'

@InputType()
export class CreateUserInput implements Prisma.UserUncheckedCreateInput {
  id?: string | undefined

  @IsString()
  @Field(() => String)
  name!: string

  @IsString()
  @Field(() => String)
  last_name!: string

  @IsString()
  @TransformLowercase()
  @Field(() => String)
  user_name!:string

  @IsEmail()
  @TransformLowercase()
  @Field(() => String)
  email!: string

  @IsString()
  @Field(() => String)
  password!: string

  @IsString()
  @IsOptional()
  @Field(() => String, { nullable: true })
  phone_number?: string | null | undefined

  @IsNumber()
  @IsOptional()
  @Field(() => Int, { nullable: true })
  createdAt?: string | Date | undefined
  updatedAt?: string | Date | undefined
}
