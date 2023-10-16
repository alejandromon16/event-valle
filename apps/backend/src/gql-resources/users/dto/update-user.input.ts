import { IsNumber } from 'class-validator'
import { CreateUserInput } from './create-user.input'
import { InputType, Field, PartialType } from '@nestjs/graphql'

@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {
  @Field(() => String)
  @IsNumber()
  id!: string
}
